group "default" {
  targets = ["bookworm-prod"]
}

target "metadata-action" {}

variable "NODE_VERSION" {
  default = null
}

variable "VARIANT" {
  default = null
}

variable "PUSH" {
  default = "false"
}

function "_output" {
  params = [push]
  result = push ? "type=registry" : "type=oci,dest=/tmp/container.oci"
}

variable "CI" {
  default = "false"
}

function "_secrets" {
  params = [ci]
  result = ci ? [
    "id=domain,env=MICROCMS_SERVICE_DOMAIN",
    "id=key,env=MICROCMS_API_KEY",
    "id=secret,env=MICROCMS_SECRET",
  ] : [
    "id=domain,src=docker/private/microcms/service_domain.txt",
    "id=key,src=docker/private/microcms/api_key.txt",
    "id=secret,src=docker/private/microcms/secret.txt",
  ]
}

target "_platforms" {
  platforms = [
    "linux/amd64",
    "linux/arm64",
  ]
}

target "_args" {
  args = {
    "VARIANT" = VARIANT,
    "NODE_VERSION" = NODE_VERSION,
  }
}

target "_base" {
  inherits = ["_args"]

  args = {
    "BUILDKIT_SBOM_SCAN_CONTEXT" = "true",
  }

  attest = [
    "type=sbom",
    "type=provenance,mode=max",
  ]

  context = "."
  dockerfile = "docker/Dockerfile"
  secret = _secrets(CI)
  output = [_output(PUSH)]
}

target "bookworm-prod" {
  target = "runtime"
  inherits = [
    "metadata-action",
    "_platforms",
    "_base",
  ]
}

target "bookworm-dev" {
  target = "development"
  inherits = [
    "metadata-action",
    "_platforms",
    "_base",
  ]
}
