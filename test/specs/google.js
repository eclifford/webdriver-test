// SYNC custom command
// Note: does not appear to be propagating `waitForTimeoutError`
browser.addCommand('fooSync', function() {
  browser.waitForExist('#foo');
});

// ASYNC custom command
// Note: properly propagates `waitForTimeoutError`
browser.addCommand('fooAsync', function async() {
  return browser.waitForExist('#foo');
});

describe('When loading google.com', function() {
  this.retries(1);

  // will successfully retry once #foo is not found
  it('should find foo', function() {
    browser.url('http://google.com');
    browser.waitForExist('#foo');
  });
  // will not retry once #foo is not found in SYNC helper
  it('should find foo with custom command', function() {
    browser.url('http://google.com');
    browser.fooSync();
  });
  // will retry once #foo is not found in ASYNC helper
  it('should find foo', function() {
    browser.url('http://google.com');
    browser.fooAsync();
  });
});