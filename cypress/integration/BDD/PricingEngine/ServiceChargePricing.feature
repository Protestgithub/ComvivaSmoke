Feature:ServiceChargePricing

# Author: Arpitha C
# Last Updated: 2/05/2022
# Comments : Service Charge Pricing Module Test Cases
# Scenario_ID : SC_27 
@test

Scenario:To verify that System admin should be able to view pricing engine module on web.
Given Login into Mobiquity Portal as System admin Maker
When Click on Pricing Engine
Then System admin should be able to view pricing engine module on web.


# Author: Arpitha C
# Last Updated: 2/05/2022
# Comments : Service Charge Pricing Module Test Cases
# Scenario_ID : SC_28
@test

Scenario:To verify that User other than System admin should not able to view pricing engine module on web.
Given Login into Mobiquity Portal as Super admin
Then User other than System admin should not able to view pricing engine module on web.


# Author: Arpitha C
# Last Updated: 2/05/2022
# Comments : Service Charge Pricing Module Test Cases
# Scenario_ID : SC_29 
@test

Scenario:To verify that user should be redirected to a new page for pricing engine.
Given Login into Mobiquity Portal as System admin Maker
When Click on Pricing Engine
Then User should be redirected to a new page for pricing engine.

# Author: Arpitha C
# Last Updated: 2/05/2022
# Comments : Service Charge Pricing Module Test Cases
# Scenario_ID : SC_30

@test

Scenario:To verify that System admin should be able to add initiate service charge through Pricing engine module successfully.
Given Login into Mobiquity Portal as System admin Maker
When Click on Pricing Engine
And Click on the Service Policy
And Click on add new rule buttton,add New service charge and save the policy as draft

# Author: Arpitha C
# Last Updated: 2/05/2022
# Comments : Service Charge Pricing Module Test Cases
# Scenario_ID : SC_32
@test


Scenario:To verify that user should also be able to make commission profile with the same pricing engine module.
Given Login into Mobiquity Portal as System admin Maker
When Click on Pricing Engine
And Click on commission 
And Click on commission and select the service you want to add commission profile for


# Author: Chetan.S
# Last Updated: 29-04-2022
# Comments 
# Scenario_ID :
# TC_33
@test

Scenario:To verify that user should be able to calculate service charge using pricing calculator.
Given Login into Mobiquity Portal as System admin Maker
When Click on Pricing Engine
And Click on Pricing Caluclator
And Enter the party Details
And Enter Other Details
Then Calculate Service Charge

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
