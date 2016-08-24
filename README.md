# apiary_style_guides

This code provides a test jig for the development and testing of new 
Apiary Style Guide rules. Given a set of rules and a Blueprint API specification, the code 
iterates over specific constructs in the specification, validating each occurrence of a 
construct against applicable rules. 

For example, a URL is a construct, as is the format of JSON keys. One rule might dictate
every URL that receives a POST must end as plural. Another rule could mandate that
JSON keys match the format `[[:lower:]][[:alnum:]]*` (any string beginning with 
a lower case letter, followed by any number of characters from the set `0-9a-zA-Z`). 

Each occurrence of a construct is sent to one or more validation methods. If the occurrence
is valid, the method returns true; otherwise, the method yields false. 

A small manifest written in JSON maps constructs to validation methods. You can find
an example manifest in this repo at _apiary/rules.json_. The combination of the manifest
and a set of validation rules is an enforceable style guide. If you're using the Apiary 
Interactive Editor, non-conforming elements are immediately flagged as an issue. Some heinous
errors may even prevent saving and committing changes to the spec.

## References

[Apiary Style Guides](https://help.apiary.io/tools/style-guide/)

[Enhancing Apiary Workflow](https://help.apiary.io/api_101/enhancing-apiary-workflow/)

[The Open Source API Blueprint Description Language](https://apiblueprint.org)
