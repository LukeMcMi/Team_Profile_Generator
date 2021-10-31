const Engineer = require("../lib/classes/Engineer");

test("Set GitHub account with constructor", () => {
    const testValue = "github";
    const e = new Engineer("Chucky", 1, "chucky@test.com", testValue);
    expect(e.github).toBe(testValue);
});

test("getRole() should return \'Engineer\'", () => {
    const testValue = "Engineer";
    const e = new Engineer("Chucky", 1, "chucky@test.com", "github");
    expect(e.getRole()).toBe(testValue);
});

test("Get GitHub username with getGithub()", () => {
    const testValue = "github";
    const e = new Engineer("Chucky", 1, "chucky@test.com", testValue);
    expect(e.getGithub()).toBe(testValue);
});