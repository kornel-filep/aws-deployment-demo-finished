#!/bin/bash

# Script to build and deploy the Gemini Chat application to AWS
# Usage: ./deploy.sh [--profile PROFILE_NAME]

set -e

# Parse arguments
PROFILE=""
while [[ $# -gt 0 ]]; do
  case $1 in
    --profile|-p)
      PROFILE="$2"
      shift 2
      ;;
    --help|-h)
      echo "Usage: $0 [--profile PROFILE_NAME]"
      echo ""
      echo "Options:"
      echo "  --profile, -p PROFILE_NAME    AWS CLI profile to use"
      echo "  --help, -h                    Show this help message"
      echo ""
      echo "Examples:"
      echo "  $0                            # Use default AWS profile"
      echo "  $0 --profile personal         # Use 'personal' profile"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      echo "Use --help for usage information"
      exit 1
      ;;
  esac
done

# Build profile argument for CDK
CDK_PROFILE_ARG=""
if [ -n "$PROFILE" ]; then
  CDK_PROFILE_ARG="--profile $PROFILE"
  echo "Using AWS profile: $PROFILE"
fi

echo "🏗️  Building React application..."
npm run build

echo ""
echo "🚀 Deploying to AWS with CDK..."
cd cdk
npx cdk deploy $CDK_PROFILE_ARG --require-approval never

echo ""
echo "✅ Deployment complete!"
echo "Check the CloudFront URL in the CDK output above."

