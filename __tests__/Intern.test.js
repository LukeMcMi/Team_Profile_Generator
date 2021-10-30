const Intern = require("../lib/Intern");

test("Set school with constructor", () => {
    const testValue = "USYD";
    const e = new Intern("Chucky", 1, "chucky@test.com", testValue);
    expect(e.school).toBe(testValue);
});

test("getRole() should return \'Intern\'", () => {
    const testValue = "Intern";
    const e = new Intern("Chucky", 1, "chucky@test.com", "USYD");
    expect(e.getRole()).toBe(testValue);
});

test("Get school with getSchool()", () => {
    const testValue = "USYD";
    const e = new Intern("Chucky", 1, "chucky@test.com", testValue);
    expect(e.getSchool()).toBe(testValue);
});