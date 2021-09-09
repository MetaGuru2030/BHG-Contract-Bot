const { Snipping, Front, SnippingDetail, FrontDetail, Setting } = require("../models");
const app = require("../app.js");

function sendUpdateMessage() {
  var aWss = app.wss.getWss("/");
  aWss.clients.forEach(function(client) {
    client.send("setting Updated");
  });
}

function resetSnipping(req, res) {
  Snipping.destroy({
    where: {
      id: 1,
    },
  })
    .then((status) =>
      res.status(201).json({
        error: false,
        message: "Snipping Information has been deleted",
      })
    )
    .catch((error) =>
      res.json({
        error: true,
        message: error,
      })
    );
  sendUpdateMessage();
}

function resetFront(req, res) {
  Front.destroy({
    where: {
      id: 1,
    },
  })
    .then((status) =>
      res.status(201).json({
        error: false,
        message: "Snipping Information has been deleted",
      })
    )
    .catch((error) =>
      res.json({
        error: true,
        message: error,
      })
    );
  sendUpdateMessage();
}

function initSnipping(req, res) {
  SnippingDetail.destroy({
    where: {},
    truncate: true,
  })
    .then((status) =>
      res.status(201).json({
        error: false,
        message: "Snipping Transaction History has been deleted",
      })
    )
    .catch((error) =>
      res.json({
        error: true,
        message: error,
      })
    );
  sendUpdateMessage();
}

function initFront(req, res) {
  FrontDetail.destroy({
    where: {},
    truncate: true,
  })
    .then((status) =>
      res.status(201).json({
        error: false,
        message: "Front running Transaction History has been deleted",
      })
    )
    .catch((error) =>
      res.json({
        error: true,
        message: error,
      })
    );
  sendUpdateMessage();
}

function resetAll(req, res) {
  Snipping.destroy({
    where: {
      id: 1,
    },
  });

  Front.destroy({
    where: {
      id: 1,
    },
  });

  SnippingDetail.destroy({
    where: {},
    truncate: true,
  });

  FrontDetail.destroy({
    where: {},
    truncate: true,
  })
    .then((status) =>
      res.status(201).json({
        error: false,
        message: "All Information has been deleted",
      })
    )
    .catch((error) =>
      res.json({
        error: true,
        message: error,
      })
    );
  sendUpdateMessage();
}


function saveSetting(req, res) {
  const {
    wallet,
    key,
    contract
  } = req.body;

  Setting.update(
    {
      wallet: wallet,
      key: key,
      contract: contract,
    },
    {
      where: {
        id: 1,
      },
    }
  )
    .then((setting) =>
      res.status(201).json({
        error: false,
        data: setting,
        message: "setting has been updated in the snipping",
      })
    )
    .catch((error) =>
      res.json({
        error: true,
        error: error,
      })
    );


}

function loadSetting(req, res) {

  console.log(
    "------------- Load setting -------------------"
  );


  Setting.findAll({
    where: {
      id: 1,
    },
  })
    .then((setting) => {
      if (setting.length == 0) {
        console.log(
          "-------------setting status",
          setting,
          setting.length
        );

        let item = {
          id: 1,
          status: 0,
          wallet: "",
          key: "",
          contract : ""
        };

        Setting.create(item).then((data) => {
          Setting.findAll({
            where: {
              id: 1,
            },
          }).then((data) =>
            res.status(201).json({
              error: false,
              data: data,
              message: "setting has been updated in the snipping",
            })
          );
        });
      } else {
        res.status(201).json({
          error: false,
          data: setting,
          message: "setting has been updated in the snipping",
        });
      }
    })
    .catch((error) =>
      res.json({
        error: true,
        error: error,
      })
    );

}

function deposit(req, res) {

}

function withdraw(req, res) {

}



module.exports = {
  initFront,
  initSnipping,
  resetFront,
  resetSnipping,
  resetAll,
  saveSetting,
  loadSetting,
  deposit,
  withdraw
};
