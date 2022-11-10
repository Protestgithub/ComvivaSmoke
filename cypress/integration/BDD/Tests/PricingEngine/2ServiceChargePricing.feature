Feature:ServiceChargePricing Service Policy

# Author: Chetan.S
# Last Updated: 29-04-2022
# Comments 
# Scenario_ID :
# TC_34
@test

Scenario:To verify that user should be able to set the status of the service policy as active or inactive..
Given Login into Mobiquity Portal as System admin Maker
When Click on Pricing Engine
And Click on the Service Policy
Then Set Status Active or Inactive

# Author: Chetan.S
# Last Updated: 29-04-2022
# Comments 
# Scenario_ID :
# TC_35
@test

Scenario:Search for Rules To verify that user is able to search for rules from anywhere in the Pricing Engine.
Given Login into Mobiquity Portal as System admin Maker
When Click on Pricing Engine
And Click on the Search Tab & Search by Rule Name
Then Verify Search results should give the list of rule name with Condition,status,Validity,rule & Policytype

# Author: Chetan.S
# Last Updated: 29-04-2022
# Comments 
# Scenario_ID :
# TC_36
@test
Scenario:To verify that user is able to view the previous versions of the policy.

Given Login into Mobiquity Portal as System admin Maker
When Click on Pricing Engine
And Click on the Service Policy
And Click on any service to add service charge.
Then Logout
Given Login into Mobiquity Portal as System admin Maker
When Click on Pricing Engine
And Click on the Service Policy
Then Click on View Previous Version Link, Enter available Ver no and Proceed to View the details

# Author: Chetan.S
# Last Updated: 29-04-2022
# Comments 
# Scenario_ID :
# TC_37
@test

Scenario:To verify that if the user has saved any policy as draft he should be able to view the saved draft.
Given Login into Mobiquity Portal as System admin Maker
When Click on Pricing Engine
And Click on the Service Policy
And Click on add new rule buttton,add New service charge and save the policy as draft
Then  Check if user is able to view the saved draft



# Author: Chetan.S
# Last Updated: 29-04-2022
# Comments 
# Scenario_ID :
# TC_38
@test

Scenario:To verify that user should be able to reject the policy pending for approval.
Given Login into Mobiquity Portal as System admin Maker
When Click on Pricing Engine
And Click on the Service Policy

# Author: Chetan.S
# Last Updated: 29-04-2022
# Comments 
# Scenario_ID :
# TC_39
@test

Scenario:To verify that user can easily create a duplicate service charge by clicking on the clone option from the available service charge.
Given Login into Mobiquity Portal as System admin Maker
When Click on Pricing Engine
And Click on the Service Policy
And Click on Existing Service Policy Rule edit and save
Then  clone the edited Service Policy Rule with other service Policy

