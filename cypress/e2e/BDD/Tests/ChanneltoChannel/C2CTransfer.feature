Feature: Channel to Channel Transfer/Inverse C2C

# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : C2C
# 
@test

Scenario:To verify that channel user is able to perform C2C service successfully if the valid details are entered.
Given Login into Mobiquity Portal as Channel User
And Click on Channel to Channel Link and Enter Details

# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : Inverse C2C
# 
@test

Scenario:To verify that channel user is able to perform Inverse C2C service successfully if the valid details are entered.
Given Login into Mobiquity Portal as Channel User1
And Click on Inverse Channel to Channel Link and Enter Details

