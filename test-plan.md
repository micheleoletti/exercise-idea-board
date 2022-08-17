# Test plan

## Unit tests

- card autofocusing
- card value editable
- card createdAt time correct
- card editedAt time correct
- card deletable

const object = { a: {}, b: {}}

const array = [{key: a}, { key: b }]

const convert = (object) => array

^^^^ unit testing

<Home> <-- what do test in here?
<IdeaCard> <-- what do test in here?
<IdeaCard>
<IdeaCard>
<IdeaCard>
<Home>

<Input />

<Form> <-- you'll repeat yourself here
    <Input /> 
    <Input /> 
    <Input /> 
    <Input /> 
</Form>

<SettingsPage> <-- you'll repeat yourself here
<Input uniqueCase={true} />  
</SettingsPage>

## Integration tests

?

## E2E tests

- login flow
- add note flow
- edit note flow
- delete note flow

Unit -> Input component - when I type, the set state handler get called

Integration -> when I fill in the form and click submit, the api gets called with the values that I put in the form

E2E -> when I arrive on home page, I get redirected to login, then I login, then i get redirected back to whereever I was trying to go initially

# What to test?

The purpose of testing is gaining confidence.
I should be confident that the software actually does what it's supposed to.

The key features of this software are:

- login
- logout
- create note
- edit note
- delete note
- sort notes
- updated time updating
- character countdown

Ideally, we would have a human, the final user, testing the product, so for testing I always start with E2E testing in mind.

However, in most cases it's very cost/time ineffective to test every specification through E2E testing.
I would say the cost effectiveness of E2E testing is directly proportional to the number of entities involved to deliver that specification, so the smaller it is the less it makes sense.

In that case it starts to make sense to start poking holes in reality, sacrificing some confidence in order to gain speed and reduce costs.

So the testing plan becomes:

- login: E2E
- logout: E2E
- create note: UNIT
- edit note: UNIT
- delete note: UNIT
- note autofocus: UNIT
- sort notes: UNIT
- check updated time: UNIT
- character countdown: UNIT
