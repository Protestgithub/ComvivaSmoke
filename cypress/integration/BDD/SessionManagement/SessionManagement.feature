Feature: Session Management


#SESSION MANAGEMENT
# Author:Monica
# Last Updated:
# Comments 
# Scenario_ID : PRE-REQUISITE
# 

Scenario:Login as Subscriber
Given Login into Mobiquity Portal as Subscriber
And Change Password
And Login into Mobiquity Portal as Subscriber1


# Author:Monica
# Last Updated:
# Comments 
# Scenario_ID : TC_120
# 

Scenario:To verify that Master Admin/Network Admin can check details of all his own session through session management .
Given Login into Mobiquity Portal as System admin Maker
When Navigate to SessionManagement 
Then Click On My Sessions


# Author:Monica
# Last Updated:
# Comments 
# Scenario_ID : TC_121
# 

Scenario:To verify that Master Admin/Network Admin can check other user's session details successfully.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to SessionManagement 
And Click On All Session and Enter Number to search


# Author:Monica
# Last Updated:
# Comments 
# Scenario_ID : TC_122
# 

Scenario:To verify that Master Admin/Network Admin can delete all the session details of a selected user successfully.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to SessionManagement 
And Click On All Session and Enter Number to search
Then Delete Devices