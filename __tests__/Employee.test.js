// const { test } = require("@jest/core");
const Employee = require("../lib/classes/Employee");

test("Can initiate Employee", () => {
    const e = new Employee();
    expect(typeof(e)).toBe("object");
});

test("Set name with costructor argument", () => {
    const name = "Chucky"
    const e = new Employee(name);
    expect(e.name).toBe(name);
});

test("Set id with constructor argument", () => {
    const testValue = 999;
    const e = new Employee("Chucky", testValue);
    expect(e.id).toBe(testValue);
});

test("Set email with constructor argument", () => {
    const testValue = "Chucky@test.com";
    const e = new Employee("chucky", 1, testValue);
    expect(e.email).toBe(testValue);
});

test("Get name with getName()", () => {
    const testValue = "Chucky";
    const e = new Employee(testValue);
    expect(e.getName()).toBe(testValue);
});

test("Get ID with getId()", () => {
    const testValue = 999;
    const e = new Employee("Chucky", testValue);
    expect(e.getId()).toBe(testValue);
});

test("Get email with getEmail()", () => {
    const testValue = "chucky@test.com";
    const e = new Employee("Chucky", 1, testValue);
    expect(e.getEmail()).toBe(testValue);
});

test("getRole() should return \'Employee\'", () => {
    const testValue = "Employee";
    const e = new Employee("Chucky", 1, "chucky@test.com");
    expect(e.getRole()).toBe(testValue);
});