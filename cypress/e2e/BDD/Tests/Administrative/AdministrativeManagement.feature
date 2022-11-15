Feature:Administrative Management

# Author:
# Last Updated:
# Comments
# Scenario_ID :TC_137
#
@test



Scenario:To verify that Admin user can lock user’s wallet as sender or receiver or both.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number and KYC number in search menu1
And Click on view Details and Click on Account info
And select either Lock outgoing payments or Lock incoming payments or Lock both
Then Click On lock all