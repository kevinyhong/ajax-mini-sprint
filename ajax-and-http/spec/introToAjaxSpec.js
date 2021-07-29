describe("Intro To Ajax", () => {
  var example = {
    "id": 7889,
    "uid": "af692d95-2bf3-4036-b989-e54d9e96db16",
    "dish": "Kebab",
    "description": "Fresh parsley, Italian sausage, shallots, garlic, sun-dried tomatoes and mozzarella cheese in an all-butter crust. With a side of mixed fruits.",
    "ingredient": "Miso",
    "measurement": "2 gallon"
  };

  var methodsToTest = {
    getAllItems,
    getAllItemsCallback,
    getOneItem,
    getOneItemCallback,
    addItem,
    addItemCallback,
    updateItem,
    updateItemCallback,
    deleteItem,
    deleteItemCallback
  };

  describe("getAllItems", () => {
    beforeEach(() => {
      sinon.replace($, "ajax", sinon.fake());
      sinon.replace(methodsToTest, "getAllItems", sinon.fake(getAllItems))
      methodsToTest.getAllItems('foods');
    });
    afterEach(() => {
      sinon.restore();
    });
    it("should be a function", () => {
      expect(methodsToTest.getAllItems).to.be.a("function");
    });
    it("should take in the name of a collection as an argument", () => {
      expect(methodsToTest.getAllItems.args[0].length).to.not.equal(0);
      expect(methodsToTest.getAllItems.args[0]).to.include("foods");
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
    it("should be a function", () => {
      expect(getAllItemsCallback).to.be.a("function");
    });
    it("should invoke the callback ", () => {
      expect(getAllItemsCallback).to.be.a("function");
      expect(console.log.called).to.equal(true);
    });
    it("should log the data in the response", () => {
      expect(console.log.args[0][0]).to.be.an("array");
      for (key in console.log.args[0][0][0]) {
        expect(console.log.args[0][0][0][key]).to.equal(example[key]);
      }
    });
  });

  describe("getOneItem", () => {
    beforeEach(() => {
      sinon.replace($, "ajax", sinon.fake());
      sinon.replace(methodsToTest, "getOneItem", sinon.fake(getOneItem))
      methodsToTest.getOneItem('foods', 7889);
    });
    afterEach(() => {
      sinon.restore();
    });
    it("should be a function", () => {
      expect(methodsToTest.getOneItem).to.be.a("function");
    });
    it("should take in the name of a collection and an item ID as arguments", () => {
      expect(methodsToTest.getOneItem.args[0].length).to.equal(2);
      expect(methodsToTest.getOneItem.args[0]).to.include("foods");
      expect(methodsToTest.getOneItem.args[0]).to.include(7889);
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
      sinon.replace(methodsToTest, "addItem", sinon.fake(addItem));
      methodsToTest.addItem('foods', example);
    });
    afterEach(() => {
      sinon.restore();
    });
    it("should be a function", () => {
      expect(methodsToTest.addItem).to.be.a("function");
    });
    it("should take in the name of a collection and an item object as arguments", () => {
      expect(methodsToTest.addItem.args[0].length).to.equal(2);
      expect(methodsToTest.addItem.args[0]).to.include("foods");
      expect(methodsToTest.addItem.args[0]).to.include(example);
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
    it("should log the item that was sent to the server on success", () => {
      expect(console.log.args[0][0].data.dish).to.equal('Kebab');
    });
  });

  describe("updateItem", () => {
    var change = { ingredient: "Ground beef" };

    beforeEach(() => {
      sinon.replace($, "ajax", sinon.fake());
      sinon.replace(methodsToTest, "updateItem", sinon.fake(updateItem));
      methodsToTest.updateItem('foods', 7889, change);
    });
    afterEach(() => {
      sinon.restore();
    });
    it("should be a function", () => {
      expect(methodsToTest.updateItem).to.be.a("function");
    });
    it("should take in the name of a collection and an item object as arguments", () => {
      expect(methodsToTest.updateItem.args[0].length).to.equal(3);
      expect(methodsToTest.updateItem.args[0]).to.include("foods");
      expect(methodsToTest.updateItem.args[0]).to.include(7889);
      expect(methodsToTest.updateItem.args[0]).to.include(change);
    });
    it("should make an Ajax call", () => {
      expect($.ajax.called).to.equal(true);
    });
    it("should make a PUT request", () => {
      expect($.ajax.calledWithMatch({ type: "PUT" })).to.equal(true);
    });
    it("should send the request to the correct endpoint", () => {
      expect(
        $.ajax.calledWithMatch({ url: "http:/localhost:3000/foods/7889" }) ||
        $.ajax.calledWithMatch({ url: "http://127.0.0.1:3000/foods/7889" })
      ).to.equal(true);
    });
    it("should send the Ajax request using the input data", () => {
      expect($.ajax.args[0][0].data).to.eql({ ingredient: "Ground beef" });
    });
    it("should use the correct callbacks for success and failure", () => {
      expect($.ajax.calledWithMatch({ success: updateItemCallback })).to.equal(
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
    it("should log the UPDATE confirmation", () => {
      expect(console.log.args[0][0]).to.equal("Done.");
    });
  });

  describe("deleteItem", () => {
    beforeEach(() => {
      sinon.replace($, "ajax", sinon.fake());
      sinon.replace(methodsToTest, "deleteItem", sinon.fake(deleteItem))
      methodsToTest.deleteItem('foods', 7889);
    });
    afterEach(() => {
      sinon.restore();
    });
    it("should be a function", () => {
      expect(methodsToTest.deleteItem).to.be.a("function");
    });
    it("should take in the name of a collection and an item id as arguments", () => {
      expect(methodsToTest.deleteItem.args[0].length).to.equal(2);
      expect(methodsToTest.deleteItem.args[0]).to.include("foods");
      expect(methodsToTest.deleteItem.args[0]).to.include(7889);
    });
    it("should make an Ajax call", () => {
      expect($.ajax.called).to.equal(true);
    });
    it("should make a DELETE request for a message", () => {
      expect($.ajax.calledWithMatch({ type: "DELETE" })).to.equal(true);
    });
    it("should send the request to the correct url", () => {
      expect(
        $.ajax.calledWithMatch({ url: "http://127.0.0.1:3000/foods" })
      ).to.equal(true);
    });
    it("should send the Ajax request using the input data", () => {
      expect($.ajax.args[0][0].data).to.eql({ id: 7889 });
    });
    it("should use the correct callbacks for success and failure", () => {
      expect($.ajax.calledWithMatch({ success: deleteItemCallback })).to.equal(
        true
      );
      expect($.ajax.calledWithMatch({ error: errorLogger })).to.equal(true);
    });
  });

  describe("deleteItemCB", () => {
    beforeEach(() => {
      sinon.replace(console, "log", sinon.fake());
      deleteItemCallback(JSON.stringify({ data: { success: "Done." } }));
    });
    afterEach(() => {
      sinon.restore();
    });
    it("should be a function", () => {
      expect(deleteItemCallback).to.be.a("function");
    });
    it("should invoke the callback ", () => {
      expect(console.log.called).to.equal(true);
    });
    it("should log the DELETE confirmation", () => {
      expect(console.log.args[0][0]).to.equal("Done.");
    });
  });
});
