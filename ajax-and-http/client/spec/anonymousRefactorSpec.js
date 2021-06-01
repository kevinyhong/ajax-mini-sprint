describe("Anonymous Refactor", () => {
  beforeEach((done) => {
    resetCache(() => {
      done();
    });
  });

  describe("getAllAnon", () => {
    afterEach(() => {
      sinon.restore();
    });
    it("should be a function", () => {
      expect(getAllAnon).to.be.a("function");
    });
    it("should contain an Ajax request", () => {
      expect(getAllAnon.toString()).to.contain("$.ajax(");
    });
    it("should invoke the success callback on a successful GET request", (done) => {
      const getAllSpy = sinon.spy();
      getAllAnon((messages) => {
        getAllSpy(messages);
        expect(getAllSpy.called).to.equal(true);
        done();
      });
    });
    it("should pass the callback the correctly processed data", (done) => {
      const getAllSpy = sinon.spy();
      getAllAnon((messages) => {
        getAllSpy(messages);
        expect(getAllSpy.args[0][0]).to.be.an("array");
        expect(getAllSpy.args[0][0][0]).to.equal("Hey-you-found-me!");
        done();
      });
    });
    it("should have an error handling function", () => {
      sinon.restore();
      sinon.replace($, "ajax", sinon.fake());
      getAllAnon();
      expect($.ajax.args[0][0].error).to.be.a("function");
    });
  });

  describe("getOneAnon", () => {
    afterEach(() => {
      sinon.restore();
    });
    it("should be a function", () => {
      expect(getOneAnon).to.be.a("function");
    });
    it("should contain an Ajax request", () => {
      expect(getOneAnon.toString()).to.contain("$.ajax(");
    });
    it("should send an id as a query parameter to the correct url", () => {
      sinon.replace($, "ajax", sinon.fake());
      getOneAnon(0, () => {});
      expect($.ajax.args[0][0].data).to.eql({ id: 0 });
      expect(
        $.ajax.calledWithMatch({ url: "http://127.0.0.1:3000/getOne" })
      ).to.equal(true);
    });
    it("should invoke the callback on a successful GET request", (done) => {
      const getOneSpy = sinon.spy();
      getOneAnon(0, (message) => {
        getOneSpy(message);
        expect(getOneSpy.called).to.equal(true);
        done();
      });
    });
    it("should pass the callback the correctly processed data", (done) => {
      const getOneSpy = sinon.spy();
      getOneAnon(1, (message) => {
        getOneSpy(message);
        expect(getOneSpy.args[0][0]).to.be.a("string");
        expect(getOneSpy.args[0][0]).to.equal(
          "Oh-no,-it-seems-the-message-cache-weirdly-manipulates-messages."
        );

        done();
      });
    });
    it("should have an error handling function", () => {
      sinon.restore();
      sinon.replace($, "ajax", sinon.fake());
      getOneAnon();
      expect($.ajax.args[0][0].error).to.be.a("function");
    });
  });

  describe("sendMessageAnon", () => {
    afterEach(() => {
      sinon.restore();
    });
    it("should be a function", () => {
      expect(sendMessageAnon).to.be.a("function");
    });
    it("should contain an Ajax request", () => {
      expect(sendMessageAnon.toString()).to.contain("$.ajax(");
    });
    it("should send data containing the new message to the correct url", () => {
      sinon.replace($, "ajax", sinon.fake());
      sendMessageAnon("Hi", () => {});
      expect($.ajax.args[0][0].url).to.equal("http://127.0.0.1:3000/send");
      expect($.ajax.args[0][0].data).to.eql({ message: "Hi" });
    });
    it("should invoke the passed in callback on a successful POST request", (done) => {
      const sendSpy = sinon.spy();
      sendMessageAnon("Hey, why is this manipulating my messages?", (id) => {
        sendSpy(id);
        expect(sendSpy.called).to.equal(true);
        done();
      });
    });
    it("should pass the callback the correctly processed data", (done) => {
      const sendSpy = sinon.spy();
      sendMessageAnon("Hey, hows it going?", (id) => {
        sendSpy(id);
        expect(sendSpy.called).to.equal(true);
        expect(sendSpy.args[0][0]).to.be.a("number");
        done();
      });
    });
    it("should have an error handling function", () => {
      sinon.restore();
      sinon.replace($, "ajax", sinon.fake());
      sendMessageAnon();
      expect($.ajax.args[0][0].error).to.be.a("function");
    });
  });

  describe("updateMessageAnon", () => {
    afterEach(() => {
      sinon.restore();
    });
    it("should be a function", () => {
      expect(updateMessageAnon).to.be.a("function");
    });
    it("should contain an Ajax request", () => {
      expect(updateMessageAnon.toString()).to.contain("$.ajax(");
    });
    it("should send data with the id and new message to the correct url", () => {
      sinon.replace($, "ajax", sinon.fake());
      updateMessageAnon(0, "Get those hyphens outta here.", () => {});
      expect(
        $.ajax.calledWithMatch({ url: "http://127.0.0.1:3000/change" })
      ).to.equal(true);
      expect($.ajax.args[0][0].data).to.eql({
        id: 0,
        message: "Get those hyphens outta here.",
      });
    });
    it("should invoke the passed in callback on a successful PUT request", (done) => {
      const updateSpy = sinon.spy();
      updateMessageAnon(0, "This is just a test.", () => {
        updateSpy();
        expect(updateSpy.called).to.equal(true);
        done();
      });
    });
    it("should pass the callback the correctly processed data", (done) => {
      const updateSpy = sinon.spy();
      updateMessageAnon(0, "This is just a test.", (info) => {
        updateSpy(info);
        expect(updateSpy.args[0][0]).to.be.a("string");
        expect(updateSpy.args[0][0]).to.equal(
          "Message 0 successfully updated."
        );
        done();
      });
    });
    it("should have an error handling function", () => {
      sinon.restore();
      sinon.replace($, "ajax", sinon.fake());
      updateMessageAnon();
      expect($.ajax.args[0][0].error).to.be.a("function");
    });
  });

  describe("deleteMessageAnon", () => {
    afterEach(() => {
      sinon.restore();
    });
    it("should be a function", () => {
      expect(deleteMessageAnon).to.be.a("function");
    });
    it("should contain an Ajax request", () => {
      expect(deleteMessageAnon.toString()).to.contain("$.ajax(");
    });
    it("should send data containing the deletion target id to the correct url", () => {
      sinon.replace($, "ajax", sinon.fake());
      deleteMessageAnon(0, () => {});
      expect(
        $.ajax.calledWithMatch({ url: "http://127.0.0.1:3000/remove" })
      ).to.equal(true);
      expect($.ajax.args[0][0].data).to.eql({ id: 0 });
    });
    it("should invoke the passed in callback on a successful DELETE request", (done) => {
      const deleteSpy = sinon.spy();
      deleteMessageAnon(0, (data) => {
        deleteSpy(data);
        expect(deleteSpy.called).to.equal(true);
        done();
      });
    });
    it("should pass the callback the correctly processed data", (done) => {
      const deleteSpy = sinon.spy();
      deleteMessageAnon(1, (info) => {
        deleteSpy(info);
        expect(deleteSpy.args[0][0]).to.be.a("string");
        expect(deleteSpy.args[0][0]).to.equal("Message with ID 1 deleted.");
        done();
      });
    });
    it("should have an error handling function", () => {
      sinon.restore();
      sinon.replace($, "ajax", sinon.fake());
      deleteMessageAnon();
      expect($.ajax.args[0][0].error).to.be.a("function");
    });
  });
});

// A reset call for testing purposes
const resetCache = (callback) => {
  $.ajax({
    type: "DELETE",
    url: "http://127.0.0.1:3000/reset",
    success: (data) => {
      callback();
    },
    error: (err) => {
      console.log("The cache did not require a reset.");
      callback();
    },
  });
};

// FIX: Reset call needed to invoke callback in both success and error case, may want to refactor to use "finally"