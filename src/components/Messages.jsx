import React from 'react';

const Messages = () => (
  <div className="col h-100">
    <div className="d-flex flex-column h-100">
      <div id="messages-box" className="chat-messages overflow-auto mb-3">
        <div className="text-break">
          <b>Lamar_Ritchie39</b>
          : hi
        </div>
        <div className="text-break">
          <b>Lamar_Ritchie39</b>
          : hello
        </div>
        <div className="text-break">
          <b>Layne31</b>
          : Hhg
        </div>
        <div className="text-break">
          <b>Layne31</b>
          : Yet
        </div>
      </div>
      <div className="mt-auto">
        <form noValidate className="">
          <div className="form-group">
            <div className="input-group">
              <input name="body" aria-label="body" className="mr-2 form-control" />
              <button
                aria-label="submit"
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
              <div className="d-block invalid-feedback">&nbsp;</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default Messages;
