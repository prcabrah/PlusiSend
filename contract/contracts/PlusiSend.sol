// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PlusiSend {
    constructor() {}

    function send(address payable[] memory _recipients, uint256[] memory _amounts) external payable {
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < _amounts.length; i++) {
            require(_amounts[i] > 0, "Invalid amount: must be greater than 0.");
            require(_recipients[i] != address(0), "Invalid address: must be non-zero.");
            totalAmount += _amounts[i];
        }
        require(totalAmount <= address(msg.sender).balance, "Insufficient fund.");

        uint256 currentAmount = 0;
        for (uint256 i = 0; i < _recipients.length; i++) {
            currentAmount += _amounts[i];

            uint256 _val = _amounts[i];
            (bool sent,) = _recipients[i].call{value: _val }("");
            require(sent, "Failed to send ether");
        }
        require(currentAmount == totalAmount, "Error: ether distribution mismatch.");
    }

    fallback() external payable {
        revert();
    }
    receive() external payable {}
}