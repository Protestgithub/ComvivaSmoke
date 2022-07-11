Feature: Transfer Control Profile



# Author: Kalyani M
# Last Updated:
# Comments Error MEssage
# Test Case_ID : TC_24
# 
@test

Scenario:To verify the error message when instrument level TCP added with same Profile Name.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Transfer Control Profile and Click on Manage Transfer Level TCP
And  Click on Add New Button
Then Enter required Fields for error message
And  Click on Create Button
Then Verify Error Message

# Author: Kalyani M
# Last Updated:
# Comments : Error Message_provider
# Test Case_ID : TC_24
# 
@test

Scenario:To verify the error message when Provider is empty.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Transfer Control Profile and Click on Manage Transfer Level TCP
And  Click on Add New Button
And  Click on Create Button
Then Verify Error Message for Provider

# Author: Kalyani M
# Last Updated:
# Comments : Error Message_Domain
# Test Case_ID : TC_24
# 
@test

Scenario:To verify the error message when Domain is empty.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Transfer Control Profile and Click on Manage Transfer Level TCP
And  Click on Add New Button
And  Click on Create Button
Then Verify Error Message for Domain


# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : TC_26
#
@test

Scenario:To verify that the instrument level TCP cannot be deleted if any user is associated with it.
Given Login into Mobiquity Portal as System admin Maker
When  Navigate to Transfer Control Profile and Click on Manage Transfer Level TCP
Then Click on delete icon
Then Verify Error Message for deletion


# Author: Kalyani M
# Last Updated:
# Comments : View
# Test Case_ID : TC_25
#
@test

Scenario:To verify that master is able to View customer level TCP..
Given Login into Mobiquity Portal as Super admin Maker
When  Navigate to Transfer Control Profile to View Details

# Author: Kalyani M
# Last Updated:
# Comments : Edit
# Test Case_ID : TC_25
#
@test

Scenario:To verify that master is able to edit customer level TCP..
Given Login into Mobiquity Portal as Super admin Maker
When  Navigate to Transfer Control Profile to Edit Details
Then Verify Success Message for Edit
Then Logout 
Given Login into Mobiquity Portal as Super admin Checker after Logout
When  Navigate to Transfer Control Profile
Then Approve the TCP
Then Verify the Modification Request message

# Author: Kalyani M
# Last Updated:
# Comments : Deletion
# Test Case_ID : TC_25
#
@test

Scenario:To verify that master is able to delete customer level TCP if any user is not associated with it.
Given Login into Mobiquity Portal as Super admin Maker
When  Navigate to Transfer Control Profile to Delete Details
Then Verify Success Message for deletion



