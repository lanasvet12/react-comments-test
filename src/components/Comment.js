import styled, { css } from "styled-components";
import React, { Component } from "react";
import { Button } from "reactstrap";
import EdiText from "react-editext";
const reactStringReplace = require("react-string-replace");

const StyledEdiText = styled(EdiText)`
  button,
  input {
    margin-right: 5px;
  }
  .my-react-header {
    font-size: 1.2em;
    border: 1.5px solid #6cdaf7;
    padding: 5px;
    border-radius: 5px;
    background-color: #1f2229;
    color: #6cdaf7;
    margin-right: 10px;
  }
`;

export default class Comment extends Component {
  constructor(props) {
    super(props);
  }

  onClickDelete(e) {
    this.comment.props.comments_app.deleteComment(this.comment.props.comment);
  }

  onEditSave(new_val, comment) {
    comment.props.comments_app.editSaveComment(new_val, comment.props.comment);
  }

  render() {
    const { name, message, time, _id, user_ip } = this.props.comment;
    var message_with_br = reactStringReplace(
      message,
      "\n",
      (match, i) => "<br />"
    );
    var is_owner = name === this.props.comments_app.state.my_comment.name;
    var div_class_name = "";
    var p = this.props.comments_app.state.participants;
    var ttt = {};
    var is_participating = false;
    for (var pp in p) {
      if (p[pp].name == name) {
        ttt = { borderWidth: "4px", borderStyle: "dashed" };
        break;
      }
    }
    return (
      <div ref={this.props.ref_id} className="media mb-1" style={ttt}>
        <div className="row">
          <div className="col-sm-3 mr-2">
            <img
              className="mr-0 bg-light rounded"
              width="48"
              height="48"
              src={`https://api.adorable.io/avatars/48/${name.toLowerCase()}@adorable.io.png`}
              alt={name}
            />
          </div>
        </div>
        {/* {user_ip != null && (
          <div className="row">
            <div className="col-sm-5 pl-2">
              <img
                width="48"
                height="48"
                src={`http://api.hostip.info/flag.php?ip=${user_ip}`}
                style={{ padding: 10 + "px", margin: 0 }}
              ></img>
            </div>
          </div>
        )} */}
        <div className="media-body p-2 shadow-sm rounded bg-light border">
          <small className="float-right text-muted">{time}</small>
          <h6 className="mt-0 mb-1 text-muted">{name}</h6>
          {is_owner ? (
            <Button
              className="btn btn-dark float-right"
              comment={this}
              onClick={this.onClickDelete}
            >
              Delete
            </Button>
          ) : (
            ""
          )}
          {is_owner ? (
            <StyledEdiText
              type="text" // textarea
              viewProps={{
                className: "my-react-header",
                style: { borderRadius: 3 }
              }}
              buttonsAlign="before"
              value={message}
              onSave={val => this.onEditSave(val, this)}
            />
          ) : (
            message
          )}
        </div>
      </div>
    );
  }
}
