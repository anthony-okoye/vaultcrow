const escrowProtocol = {
    "protocol": "https://escrow-system.xyz",
    "published": true,
    "types": {
      "user": {
        "schema": "https://escrow-system.xyz/schemas/userSchema",
        "dataFormats": ["application/json"]
      },
      "transaction": {
        "schema": "https://escrow-system.xyz/schemas/transactionSchema",
        "dataFormats": ["application/json"]
      },
      "escrowService": {
        "dataFormats": ["application/json"]
      },
      "contract": {
        "schema": "https://escrow-system.xyz/schemas/contractSchema",
        "dataFormats": ["application/json"]
      }
    },
    "structure": {
      "user": {
        "$actions": [
          {
            "who": "anyone",
            "can": "read"
          },
          {
            "who": "author",
            "of": "user",
            "can": "write"
          }
        ]
      },
      "transaction": {
        "$actions": [
          {
            "who": "author",
            "of": "transaction",
            "can": "write"
          },
          {
            "who": "recipient",
            "can": "update"
          },
          {
            "who": "anyone",
            "can": "read"
          }
        ]
      },
      "escrowService": {
        "$actions": [
          {
            "who": "anyone",
            "can": "read"
          },
          {
            "who": "author",
            "of": "escrowService",
            "can": "write"
          },
          {
            "who": "recipient",
            "can": "update"
          }
        ]
      },
      "contract": {
        "$actions": [
          {
            "who": "author",
            "of": "contract",
            "can": "read"
          },
          {
            "who": "recipient",
            "of": "contract",
            "can": "read"
          },
          {
            "who": "author",
            "of": "contract",
            "can": "write"
          },
          {
            "who": "recipient",
            "can": "update"
          },
          {
            "who": "anyone",
            "can": "read"
          }
        ]
      }
    }
  };
module.exports = escrowProtocol;