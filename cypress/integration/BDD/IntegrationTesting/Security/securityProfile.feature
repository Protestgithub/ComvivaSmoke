Feature:SecurityProfile

# Author: Chetan.S
# Last Updated:
# Comments 
# Scenario_ID :
# TC_110
@test

Scenario:To verify that for each workspace there will be one default security profile
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Security and click to select security profile
And Filter by slecting Default
Then Assert each workspace have one default Profile


# Author: Chetan.S
# Last Updated: 
# Comments 
# Scenario_ID :
# TC_111
@test

Scenario:Security profile should be associated with the user at the time of on-boarding
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Subscriber and click on Subscriber
Then Verify User registration have security profile