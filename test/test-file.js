class TestClass {
  constructor() {
    this.name = "TestClass"
    this.age = 20
    this.email = 'test@test.com'
  }

  // Test this page
  getFullName() {
       return `${this.name} ${this.age}`
  }

  getEmail() {
    return this.email
  }
}

export default TestClass