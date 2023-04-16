//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MFA {
   mapping(address => bytes32) public secrets;

   function setSecret(address account, string memory secret) public {
       bytes32 hashedSecret = keccak256(abi.encodePacked(secret));
       secrets[account] = hashedSecret;
   }

   function getSecret(address account) public view returns (bytes32) {
       return secrets[account];
   }

   function checkCode(address account, string memory code) public view returns (bool) {
       bytes32 secret = secrets[account];
       bytes32 hashedSecret = keccak256(abi.encodePacked(code));
       return hashedSecret == secret;
   }
 
}
