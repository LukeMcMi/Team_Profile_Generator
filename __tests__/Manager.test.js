const Manager = require("../lib/classes/Manager");

test("Set office number with constructor argument", () => {
    const testValue = 999;
    const e = new Manager("Chucky", 1, "chucky@test.com", testValue);
    expect(e.officeNumber).toBe(testValue);
});

test("getRole() should return \'Manager\'", () => {
    const testValue = "Manager";
    const e = new Manager("Chucky", 1, "chucky@test.com", 999);
    expect(e.getRole()).toBe(testValue);
});

test("Get office number with getOfficeNumber()", () => {
    const testValue = 999;
    const e = new Manager("Chucky", 1, "chucky@test.com", testValue);
    expect(e.getOfficeNumber()).toBe(testValue);
});