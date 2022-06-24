Feature: BankingActivation

# Author: CHetan S
# Last Updated:21/06/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_156

Scenario: To verify that System Admin is able to activate Internet banking if CIF number exist.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Banking Channel Activation and click
And Enter the CIF number and search for the user
And Click on Internet Banking Activation
Then Confirm and Verify the Internet Banking Activtion Message sent to user

# Author: CHetan S
# Last Updated:21/06/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_155

Scenario: To verify that System Admin is able to activate mobile banking if CIF number exist.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Banking Channel Activation and click
And Enter the CIF number and search for the user
And Click on Mobile Banking Activation
Then Confirm and Verify the Mob Banking Activtion Message sent to user

# Author: CHetan S
# Last Updated:21/06/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_156

Scenario: To verify that System Admin is able to activate Internet banking if CIF number exist.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Banking Channel Activation and click
And Enter the CIF number and search for the user
And Click on Internet Banking Activation
Then Confirm and Verify the Internet Banking Activtion Message sent to user

# Author: CHetan S
# Last Updated:21/06/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_157

Scenario: To verify that System Admin is able to verify admin is able to see the Activated Message.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Banking Channel Activation and click
And Enter the Activated CIF number and search for the user
Then verify admin is able to see the Activated Message