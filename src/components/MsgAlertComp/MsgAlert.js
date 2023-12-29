import React from "react";
import { MsgType } from "../TextMsg/TextMsg";

export default function MsgAlert({ msgType }) {
  return <div className="msg_text">{MsgType(msgType)}</div>;
}
