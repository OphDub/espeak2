'use strict'

export class Database {
  ref = (path) => {
    if (!this[path]) {
      this[path] = new Reference(path)
    }
    return this[path]
  }
}

export class Reference {
  constructor(path) {
    this.path = path
    this.snap = { val: () => this._val() }
    this.data = null
  }

  _val = jest.fn(() => {
    return this.data
  })

  once = jest.fn((param, callback) => {
    const promise = new Promise((resolve, reject) => {
      if (callback) {
        callback(this.snap)
        resolve()
      } else {
        resolve(this.snap)
      }
    })
    RNFirebase.promises.push(promise)
    return promise
  })

  on = jest.fn((param, callback) => {
    const promise = new Promise((resolve, reject) => {
      if (callback) {
        callback(this.snap)
        resolve()
      } else {
        resolve(this.snap)
      }
    })
    RNFirebase.promises.push(promise)
    return promise
  })

  off = jest.fn((param, callback) => {
    const promise = Promise.resolve()
    RNFirebase.promises.push(promise)
    return promise
  })

  update = jest.fn((data) => {
    const promise = Promise.resolve()
    RNFirebase.promises.push(promise)
    return promise
  })

  remove = jest.fn(() => {
    const promise = Promise.resolve()
    RNFirebase.promises.push(promise)
    return promise
  })
}

export class MockFirebase {
  constructor() {
    this.database = () => {
      if (!this.databaseInstance) {
        this.databaseInstance = new Database()
      }
      return this.databaseInstance
    }
  }
}

export default class RNFirebase {
  static initializeApp() {
    RNFirebase.firebase = new MockFirebase()
    RNFirebase.promises = []
    return RNFirebase.firebase
  }

  static auth() {
    return {
      signOut: () => true,
      signInWithEmailAndPassword: (email, password) => {
        return [{
          uid: 12345,
          email: 'pophus@notpophanda.com',
        }];
      },
      signInAndRetrieveDataWithEmailAndPassword: (email, password) => {
        return {user:{
          uid: 12345,
          email: 'pophus@notpophanda.com',
        }};
      },
      createUserAndRetrieveDataWithEmailAndPassword: (email, password) => {
        return {
          uid: 54321,
          email: 'pophus@notpophanda.com',

        }
      }
    }
  }

  static reset() {
    RNFirebase.promises = []
    RNFirebase.firebase.databaseInstance = null
  }

  static waitForPromises() {
    return Promise.all(RNFirebase.promises)
  }

  static analytics() { }

  static app() { }
}
