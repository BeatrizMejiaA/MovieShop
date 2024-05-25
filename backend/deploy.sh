cd movieshop-terraform/environments/$1

terraform init && terraform apply -auto-approve

cd ../../../
pwd

executeSls(){
    pwd
    sls deploy --stage $1
}

cd crowbot-api-user/
executeSls $1
cd ../crowbot-api-trader/
executeSls $1
cd ../crowbot-api-user-report/
executeSls $1
cd ../crowbot-api-resume/
executeSls $1
cd ../crowbot-lambda-consumer/
executeSls $1
cd ../crowbot-lambda-consumer-trader/
executeSls $1
cd ../crowbot-lambda-cryptograph/
executeSls $1