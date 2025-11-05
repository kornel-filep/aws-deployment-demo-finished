#!/bin/bash

# Script to destroy the AWS infrastructure
# Usage: ./destroy.sh [--profile PROFILE_NAME] [--force]

set -e

# Parse arguments
PROFILE=""
FORCE=false
while [[ $# -gt 0 ]]; do
  case $1 in
    --profile|-p)
      PROFILE="$2"
      shift 2
      ;;
    --force|-f)
      FORCE=true
      shift
      ;;
    --help|-h)
      echo "Usage: $0 [--profile PROFILE_NAME] [--force]"
      echo ""
      echo "Options:"
      echo "  --profile, -p PROFILE_NAME    AWS CLI profile to use"
      echo "  --force, -f                   Skip confirmation prompt"
      echo "  --help, -h                    Show this help message"
      echo ""
      echo "Examples:"
      echo "  $0                            # Destroy with confirmation"
      echo "  $0 --profile personal         # Use 'personal' profile"
      echo "  $0 --force --profile personal # Skip confirmation"
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

# Confirmation prompt (unless --force is used)
if [ "$FORCE" = false ]; then
  echo "⚠️  This will destroy all AWS resources created by the CDK stack."
  read -p "Are you sure you want to continue? (yes/no): " confirm
  
  if [ "$confirm" != "yes" ]; then
      echo "Aborted."
      exit 0
  fi
fi

echo ""
echo "🗑️  Destroying AWS infrastructure..."
cd cdk
npx cdk destroy $CDK_PROFILE_ARG --force

echo ""
echo "✅ Infrastructure destroyed!"

