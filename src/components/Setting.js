import React, { useState, useEffect } from "react";
import { Button, FormControl } from "react-bootstrap";
import "./style/Setting.css";
import { saveSettingAPI, depositAPI, withdrawAPI, loadSettingAPI } from "./api";

const Setting = () => {
  const [wallet, setWallet] = useState("");
  const [key, setKey] = useState("");
  const [contract, setContract] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [wBalance, setWBalance] = useState("");
  const [cBalance, setCBalance] = useState("");

  const saveSetting = () => {
    saveSettingAPI(wallet, key, contract);
  };
  const deposit = () => {
    depositAPI(depositAmount);
  };
  const withdraw = () => {
    withdrawAPI();
  };

  const loadSetting = async () => {
    let data = await loadSettingAPI();
    setWallet(data.wallet);
    setKey(data.key);
    setContract(data.contract);
  }

  useEffect(() => {
      loadSetting();
  }, []);

  return (
    <div className="row">
      <div className="col-sm-12 col-md-6 col-lg-6">
        <div className="form-group">
          <label htmlFor="usr">Wallet Address:</label>
          <FormControl
            type="text"
            id="walletAddr"
            value={wallet}
            onChange={(e) => {
              setWallet(e.target.value);
            }}
            className="form-control form-control-md"
          />
        </div>
      </div>
      <div className="col-sm-12 col-md-6 col-lg-6">
        <div className="form-group">
          <label htmlFor="usr">Private Key:</label>
          <FormControl
            type="password"
            id="privateKey"
            value={key}
            onChange={(e) => {
              setKey(e.target.value);
            }}
            className="form-control form-control-md"
          />
        </div>
      </div>
      <div className="col-sm-12 col-md-6 col-lg-6">
        <div className="form-group">
          <label htmlFor="usr">Contract Address:</label>
          <FormControl
            type="text"
            id="contractAddress"
            value={contract}
            onChange={(e) => {
              setContract(e.target.value);
            }}
            className="form-control form-control-md"
          />
        </div>
      </div>
      <div className="col-sm-12 col-md-6 col-lg-6">
        <div className="form-group">
          <label htmlFor="empty">&nbsp;</label>
          <Button
            className="save-btn"
            variant="primary"
            id="setSetting"
            onClick={() => saveSetting()}
          >
            Save
          </Button>
        </div>
      </div>
      <div className="col-sm-12 col-md-12 col-lg-12">
        <div className="form-group withdraw-wrapper">
          <label htmlFor="label">Deposit or Withdraw ?</label>
          <label htmlFor="label">Wallet Balance : {wBalance}</label>
          <div>
            <input
              type="text"
              className="form-control"
              id="depositAmount "
              value={depositAmount}
              onChange={(e) => {
                setDepositAmount(e.target.value);
              }}
            />
            <button className="btn btn-primary" onClick={() => deposit()}>
              Deposit
            </button>
          </div>
          <label htmlFor="label">Contract Balance : {cBalance} </label>
          <button className="btn btn-primary" onClick={() => withdraw()}>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
