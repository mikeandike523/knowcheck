#!/bin/bash

# Check if the project ID is provided as a parameter
if [ -z "$1" ]; then
  echo "Please provide the project ID as a parameter."
  exit 1
fi

# Set the project ID
PROJECT_ID=$1

# Set the service account name
SERVICE_ACCOUNT_NAME="service-account"

# Set the key file name
KEY_FILE="key.json"

# Set the project
gcloud config set project "$PROJECT_ID"

# Create the service account
gcloud iam service-accounts create "$SERVICE_ACCOUNT_NAME" --display-name="Service Account"

# Grant Datastore User role to the service account
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/datastore.user"

# Grant Storage Admin role to the service account
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

# Generate a key for the service account
gcloud iam service-accounts keys create --iam-account="$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" "$KEY_FILE"

echo "Service account '$SERVICE_ACCOUNT_NAME' created successfully."
echo "Key file '$KEY_FILE' downloaded locally."