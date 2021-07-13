describe("Message Requests", () => {
  describe("fetchMessagesFromParseServer", () => {
    beforeEach(() => {
      sinon.replace($, "ajax", sinon.fake());
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should be a function", () => {
      expect(fetchMessagesFromParseServer).to.be.a("function");
    });

    it("should make an Ajax call", () => {
      fetchMessagesFromParseServer();
      expect($.ajax.called).to.equal(true);
    });

    it("should make a GET request", () => {
      fetchMessagesFromParseServer();
      expect($.ajax.calledWithMatch({ type: "GET" })).to.equal(true);
    });

    it("should send the request to the correct endpoint", () => {
      fetchMessagesFromParseServer();
      expect(
        $.ajax.calledWithMatch({ url: `https://app-hrsei-api.herokuapp.com/api/chatterbox/messages/${CAMPUS}` })
      ).to.equal(true);
    });

    it("should include an Authorization header as part of the request", () => {
      fetchMessagesFromParseServer();
      expect($.ajax.calledWithMatch({ headers: { Authorization: API_KEY } })).to.equal(true);
    });

    it("should invoke the callback argument on success", () => {
      const handleMessagesSpy = sinon.spy();
      fetchMessagesFromParseServer((data) => {
        handleMessagesSpy(data);
        expect(handleMessagesSpy.called).to.equal(true);
      });
    })

    it("should fetch 100 messages from the Parse server", () => {
      fetchMessagesFromParseServer((data) => {
        expect(data).to.be.an.instanceof(Array);
        expect(data.length).to.eql(100);
      });
    })
  });

  describe("addMessageToParseServer", () => {
    beforeEach(() => {
      sinon.replace($, "ajax", sinon.fake());
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should be a function", () => {
      expect(addMessageToParseServer).to.be.a("function");
    });

    it("should make an Ajax call", () => {
      addMessageToParseServer();
      expect($.ajax.called).to.equal(true);
    });

    it("should make a POST request", () => {
      addMessageToParseServer();
      expect($.ajax.calledWithMatch({ type: "POST" })).to.equal(true);
    });

    it("should send the request to the correct endpoint", () => {
      addMessageToParseServer();
      expect(
        $.ajax.calledWithMatch({ url: `https://app-hrsei-api.herokuapp.com/api/chatterbox/messages/${CAMPUS}` })
      ).to.equal(true);
    });

    it("should include an Authorization header as part of the request", () => {
      addMessageToParseServer();
      expect($.ajax.calledWithMatch({ headers: { Authorization: API_KEY } })).to.equal(true);
    });

    it("should take in a message object to be sent to the Parse server", () => {
      var message = {
        username: 'shawndrost',
        text: 'trololo',
        roomname: 'test'
      };
      addMessageToParseServer(message);
      expect($.ajax.calledWithMatch({ data: message })).to.equal(true);
    });

    it("should invoke the callback argument on success", () => {
      const addMessageSpy = sinon.spy();
      var message = {
        username: 'shawndrost',
        text: 'trololo',
        roomname: 'test'
      };

      addMessageToParseServer(message, (data) => {
        addMessageSpy(data);
        expect(addMessageSpy.called).to.equal(true);
      });
    });
  });
});
