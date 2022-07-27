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
