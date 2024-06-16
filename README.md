
# MovieShop

Welcome to the MovieShop project! This README provides instructions on how to set up the infrastructure and deploy the microservices for the MovieShop platform using Terraform and the Serverless Framework.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

1. **Terraform**: Used for infrastructure as code to create resources on AWS.
   - Required Version: Terraform v0.12.21
2. **Serverless Framework**: Used to deploy serverless applications on AWS Lambda.
   - Required Version: 
     - Framework Core: 3.38.0
     - Plugin: 7.2.3
     - SDK: 4.5.1
3. **Node.js and npm**: Required to run and deploy Node.js microservices.
4. **AWS CLI**: Required to interact with your AWS account from the command line.
5. **Angular**: Used for the frontend development of the web application.
   - Required Version: Angular ^v17
   - Required version: @ionic/angular: ^8.0.0

## Installation

### Terraform

1. **Download Terraform**: [Terraform Downloads](https://www.terraform.io/downloads)
2. **Install Terraform**: Follow the installation instructions for your operating system.

   For example, on macOS:
   ```sh
   brew install terraform
   ```

   On Windows, download the binary and add it to your PATH.

3. **Verify Installation**:
   ```sh
   terraform -v
   ```

### Serverless Framework

1. **Install Serverless Framework**:
   ```sh
   npm install -g serverless
   ```

2. **Verify Installation**:
   ```sh
   serverless -v
   ```

### AWS CLI

1. **Install AWS CLI**: [AWS CLI Installation Guide](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

2. **Configure AWS CLI**:
   ```sh
   aws configure
   ```
   Follow the prompts to set up your AWS Access Key ID, Secret Access Key, region, and output format.

### Angular

1. **Install Angular CLI**:
   ```sh
   npm install -g @angular/cli@17
   ```

2. **Verify Installation**:
   ```sh
   ng --version
   ```
### Ionic
1. **Install Ionic CLI:**
   ```sh
   npm install -g @ionic/cli
   ```
2. **Verify Installation**:
   ```sh
   ionic --version
   ```

## Setting Up the Infrastructure

### Using Terraform

1. **Navigate to the Terraform Directory**:
   ```sh
   cd terraform
   ```

2. **Initialize Terraform**:
   ```sh
   terraform init
   ```

3. **Plan the Infrastructure**:
   ```sh
   cd terraform/environments/movieshop-dev
   terraform plan
   ```

4. **Apply the Infrastructure Configuration**:
   ```sh
   cd terraform/environments/movieshop-dev
   terraform apply"
   ```

   This will create the necessary AWS resources for the MovieShop environment.

## Deploying Microservices

### Using Serverless Framework

1. **Navigate to the Microservice Directory**:
   ```sh
   cd movieshop-api-merchant
   ```

2. **Deploy the Microservice**:
   ```sh
   sls deploy --stage movieshop-nl-dev
   ```

   Repeat this step for each microservice folder within the directory.

## Project Structure

- `terraform/environments`: Contains Terraform configuration files for setting up AWS infrastructure.
- `terraform/infra`: Contains subdirectories for each microservice infrastructure configuration, each with its own Serverless Framework configuration.

## Example

Here is an example of deploying a specific microservice:

1. **Navigate to the Layer For Common Code**:
   ```sh
   cd moviesshop-layers
   ```

2. **Deploy the Layer common Code**:
   ```sh
   sls deploy --stage movieshop-nl-dev
   ```

## Additional Commands

- **View Terraform State**:
  ```sh
  terraform show
  ```

- **Destroy Terraform Infrastructure on AWS**:
  ```sh
  cd terraform/environments/movieshop-dev
  terraform destroy"
  ```

- **Invoke Serverless Functions Locally**:
  ```sh
  serverless invoke local -f <function-name>
  ```

## Conclusion

You now have the instructions to set up and deploy the MovieShop platform. If you encounter any issues or have questions, please refer to the official documentation for Terraform and the Serverless Framework, or contact the project maintainers.

Happy coding!
