describe("Intro To Ajax", () => {
  var example = {
    "id": 7889,
    "uid": "af692d95-2bf3-4036-b989-e54d9e96db16",
    "dish": "Kebab",
    "description": "Fresh parsley, Italian sausage, shallots, garlic, sun-dried tomatoes and mozzarella cheese in an all-butter crust. With a side of mixed fruits.",
    "ingredient": "Miso",
    "measurement": "2 gallon"
  };

  describe("getAllItems", () => {
    beforeEach(() => {
      sinon.replace($, "ajax", sinon.fake());
      getAllItems();
    });
    afterEach(() => {
      sinon.restore();
    });
    it("should be a function", () => {
      expect(getAllItems).to.be.a("function");
    });
    it("should make an Ajax call", () => {
      expect($.ajax.called).to.equal(true);
    });
    it("should make a GET request", () => {
      expect($.ajax.calledWithMatch({ type: "GET" })).to.equal(true);
    });
    it("should send the request to the correct endpoint", () => {
      expect(
        $.ajax.calledWithMatch({ url: "http://127.0.0.1:3000/foods" }) ||
          $.ajax.calledWithMatch({ url: "http://localhost:3000/foods" })
      ).to.equal(true);
    });
    it("should be given the correct success and failure callbacks", () => {
      expect($.ajax.calledWithMatch({ success: getAllItemsCallback })).to.equal(
        true
      );
      expect($.ajax.calledWithMatch({ error: errorLogger })).to.equal(true);
    });
  });

  describe("getAllItemsCB", () => {
    beforeEach(() => {
      sinon.replace(console, "log", sinon.fake());
      getAllItemsCallback(JSON.stringify([example]));
    });
    afterEach(() => {
      sinon.restore();
    });
    it("should invoke the callback ", () => {
      expect(getAllItemsCallback).to.be.a("function");
      expect(console.log.called).to.equal(true);
    });
    it("should console log the correctly processed data", () => {
      expect(console.log.args[0][0]).to.be.an("array");
      for (key in console.log.args[0][0][0]) {
        expect(console.log.args[0][0][0][key]).to.equal(example[key]);
      }

    });
  });

  describe("getOneItem", () => {
    beforeEach(() => {
      sinon.replace($, "ajax", sinon.fake());
      getOneItem(7889);
    });
    afterEach(() => {
      sinon.restore();
    });
    it("should be a function", () => {
      expect(getOneItem).to.be.a("function");
    });
    it("should make an Ajax call", () => {
      expect($.ajax.called).to.equal(true);
    });
    it("should make a GET request", () => {
      expect($.ajax.calledWithMatch({ type: "GET" })).to.equal(true);
    });
    it("should send the request to the correct endpoint", () => {
      expect(
        $.ajax.calledWithMatch({ url: "http://localhost:3000/foods" }) ||
          $.ajax.calledWithMatch({ url: "http://127.0.0.1:3000/foods" })
      ).to.equal(true);
    });
    it("should send the Ajax request using the input data", () => {
      expect($.ajax.calledWithMatch({ data: { id: 7889 } })).to.equal(true);
    });
    it("should use the correct callbacks for success and failure", () => {
      expect($.ajax.calledWithMatch({ success: getOneItemCallback })).to.equal(
        true
      );
      expect($.ajax.calledWithMatch({ error: errorLogger })).to.equal(true);
    });
  });

  describe("getOneItemCB", () => {
    beforeEach(() => {
      sinon.replace(console, "log", sinon.fake());
      getOneItemCallback(JSON.stringify(example));
    });
    afterEach(() => {
      sinon.restore();
    });

    it("should be a function", () => {
      expect(getOneItemCallback).to.be.a("function");
    });
    it("should invoke the callback ", () => {
      expect(console.log.called).to.equal(true);
    });
    it("should console log the correctly processed data", () => {
      for (key in console.log.args[0][0][0]) {
        expect(console.log.args[0][0][0][key]).to.equal(example[key]);
      }
    });
  });

  describe("addItem", () => {
    beforeEach(() => {
      sinon.replace($, "ajax", sinon.fake());
      addItem(example);
    });
    afterEach(() => {
      sinon.restore();
    });
    it("should be a function", () => {
      expect(addItem).to.be.a("function");
    });
    it("should make an Ajax call", () => {
      expect($.ajax.called).to.equal(true);
    });
    it("should make a POST request with a new message", () => {
      expect($.ajax.calledWithMatch({ type: "POST" })).to.equal(true);
    });
    it("should send the request to the correct endpoint", () => {
      expect(
        $.ajax.calledWithMatch({ url: "http:/localhost:3000/foods" }) ||
          $.ajax.calledWithMatch({ url: "http://127.0.0.1:3000/foods" })
      ).to.equal(true);
    });
    it("should send the Ajax request using the input data", () => {
      for (key in $.ajax.args[0][0].data) {
        expect($.ajax.args[0][0].data[key]).to.eql(example[key]);
      }
    });
    it("should use the correct callbacks for success and failure", () => {
      expect($.ajax.calledWithMatch({ success: addItemCallback })).to.equal(true);
      expect($.ajax.calledWithMatch({ error: errorLogger })).to.equal(true);
    });
  });

  describe("addItemCB", () => {
    beforeEach(() => {
      sinon.replace(console, "log", sinon.fake());
      addItemCallback(`{"data": ${JSON.stringify(example)}}`);
    });
    afterEach(() => {
      sinon.restore();
    });
    it("should be a function", () => {
      expect(addItemCallback).to.be.a("function");
    });
    it("should invoke the callback ", () => {
      expect(console.log.called).to.equal(true);
    });
    it("should console log the correctly processed data", () => {
      expect(console.log.args[0][0].data.dish).to.equal('Kebab');
    });
  });

  describe("updateItem", () => {
    beforeEach(() => {
      sinon.replace($, "ajax", sinon.fake());
      updateMessage(7889, JSON.stringify({
          "measurement": "1 gallon"
        }));
    });
    afterEach(() => {
      sinon.restore();
    });
    it("should be a function", () => {
      expect(updateMessage).to.be.a("function");
    });
    it("should make an Ajax call", () => {
      expect($.ajax.called).to.equal(true);
    });
    it("should make a PUT request", () => {
      expect($.ajax.calledWithMatch({ type: "PUT" })).to.equal(true);
    });
    it("should send the request to the correct endpoint", () => {
      expect(
        $.ajax.calledWithMatch({ url: "http:/localhost:3000/change" }) ||
          $.ajax.calledWithMatch({ url: "http://127.0.0.1:3000/change" })
      ).to.equal(true);
    });
    it("should send the Ajax request using the input data", () => {
      expect($.ajax.args[0][0].data).to.eql({ id: 7889, message: "I fixed it!" });
    });
    it("should use the correct callbacks for success and failure", () => {
      expect($.ajax.calledWithMatch({ success: updateCallback })).to.equal(
        true
      );
      expect($.ajax.calledWithMatch({ error: errorLogger })).to.equal(true);
    });
  });

  describe("updateItemCB", () => {
    beforeEach(() => {
      sinon.replace(console, "log", sinon.fake());
      updateItemCallback(JSON.stringify({ data: { success: "Done." } }));
    });
    afterEach(() => {
      sinon.restore();
    });
    it("should be a function", () => {
      expect(updateItemCallback).to.be.a("function");
    });
    it("should invoke the callback", () => {
      expect(console.log.called).to.equal(true);
    });
    it("should console log the correctly processed data", () => {
      expect(console.log.args[0][0]).to.equal("Done.");
    });
  });

  describe("deleteitem", () => {
    beforeEach(() => {
      sinon.replace($, "ajax", sinon.fake());
      deleteMessage(0);
    });
    afterEach(() => {
      sinon.restore();
    });
    it("should be a function", () => {
      expect(deleteMessage).to.be.a("function");
    });
    it("should make an Ajax call", () => {
      expect($.ajax.called).to.equal(true);
    });
    it("should make a DELETE request for a message", () => {
      expect($.ajax.calledWithMatch({ type: "DELETE" })).to.equal(true);
    });
    it("should send the request to the correct url", () => {
      expect(
        $.ajax.calledWithMatch({ url: "http://127.0.0.1:3000/remove" })
      ).to.equal(true);
    });
    it("should send the Ajax request using the input data", () => {
      expect($.ajax.args[0][0].data).to.eql({ id: 0 });
    });
    it("should use the correct callbacks for success and failure", () => {
      expect($.ajax.calledWithMatch({ success: deleteCallback })).to.equal(
        true
      );
      expect($.ajax.calledWithMatch({ error: errorLogger })).to.equal(true);
    });
  });

  describe("deleteMessageCB", () => {
    beforeEach(() => {
      sinon.replace(console, "log", sinon.fake());
      deleteCallback(JSON.stringify({ data: { success: "Done." } }));
    });
    afterEach(() => {
      sinon.restore();
    });
    it("should be a function", () => {
      expect(deleteCallback).to.be.a("function");
    });
    it("should invoke the callback ", () => {
      expect(console.log.called).to.equal(true);
    });
    it("should console log the correctly processed data", () => {
      expect(console.log.args[0][0]).to.equal("Done.");
    });
  });
});
