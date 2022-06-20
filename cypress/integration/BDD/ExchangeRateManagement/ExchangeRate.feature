Feature: Exchange Rate Management

#EXCHANGE RATE MANAGEMENT 

# Author:Monica
# Last Updated:
# Comments 
# Scenario_ID : TC_116
# 



Scenario:To verify that system admin can initiate Add Exchange Rate .
Given Login into Mobiquity Portal as System admin User1
When Navigate to Exchange Rate Management and Click on Add Exchange Rate
And Enter all the required details and click on Submit
Then System Admin can initiate Add Exchange Rate

# Author:Monica
# Last Updated:
# Comments 
# Scenario_ID : TC_117
# 

Scenario:Approve Exchange Rate Management
Given Login into Mobiquity Portal as System admin User
And Navigate to Exchange Rate Management and Click Approve or Reject ER
And Approve Or Reject ER



# Author:Monica
# Last Updated:
# Comments 
# Scenario_ID : TC_119
# 

Scenario:To verify that system admin can Modify the Exchange Rate in the system susccessfully.
Given Login into Mobiquity Portal as System admin User
And Navigate to Exchange Rate Management and Click Update Exchange Rate
And Enter all details and click on Submit
And Logout
And Login into Mobiquity Portal as another System admin User after Logout
And Navigate to Exchange Rate Management and Click Approve or Reject Updated Exchange Rate
Then Click on Approve to Approve Exchange Rate


# Author:Monica
# Last Updated:
# Comments 
# Scenario_ID : TC_118
# 


Scenario:To verify that systen admin can View Modification exchange History successfully.
Given Login into Mobiquity Portal as System admin User
And Navigate to Exchange Rate Management and Click Show Modification History

