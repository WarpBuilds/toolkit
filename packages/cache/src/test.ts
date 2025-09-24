import {saveCache, restoreCache} from './cache'

// process.env['WARPBUILD_CACHE_URL'] = 'https://cache.dev.warpbuild.dev'
process.env['WARPBUILD_CACHE_URL'] = 'http://localhost:8000'
// process.env['WARPBUILD_CACHE_URL'] =
//   'https://6134-36-255-234-176.ngrok-free.app'
process.env['RUNNER_TEMP'] = '/Users/prajjwal/Repos/warpbuild/playground/tmp_fs'
// process.env['NODE_DEBUG'] = 'http'
process.env['RUNNER_DEBUG'] = '1'
process.env['WARPBUILD_RUNNER_VERIFICATION_TOKEN'] =
  'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJhYyI6Ilt7XCJTY29wZVwiOlwicmVmcy9oZWFkcy9tYWluXCIsXCJQZXJtaXNzaW9uXCI6M31dIiwiY29ubmVjdGlvbklkIjoiaW50ZXJuYWwiLCJleHAiOjE3NTc5MDk5MTMsIm5iZiI6MTc1NzY1MDcxMywicnVubmVySWQiOiJ3YXJwZGV2LTh4LXg2NC13NHZsY2o0dTc5d3B5eTllIiwic3RhY2tJZCI6Ind3MG9oOWpvcDR4cjkweGEiLCJ4LXdhcnBidWlsZC1vcmdhbml6YXRpb24taWQiOiJ3Zm1uMDgwZWlmOHJuaXdxIn0.OO2NY6Ni-hiuVkPb7JjDOgSKjl2my9v62SHUvmLHvHmtosOng_YTPJFU_X-wddH5wYWu596bhfmIYwObuqR0wQ'
process.env['GITHUB_REPOSITORY'] = 'Warpbuilds/kitchen-sink'
process.env['GITHUB_REF'] = 'refs/heads/main'
process.env['ACTIONS_CACHE_SERVICE_V2'] = 'true'
process.env['ACTIONS_RUNTIME_TOKEN'] = 'yeet'
process.env['ACTIONS_RESULTS_URL'] =
  'https://results-receiver.actions.githubusercontent.com'
// process.env['NODE_OPTIONS'] = '--use-openssl-ca'
// process.env['NODE_EXTRA_CA_CERTS'] = '/Users/prajjwal/runner/certs/localCA.crt'
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

console.log('process.env', process.env)

// saveCache(
//   ['/Users/prajjwal/Repos/warpbuild/playground/test_fs'],
//   'test-fs-local-key',
//   {},
//   true
// )

// saveCache(
//   ['/Users/prajjwal/Repos/warpbuild/playground/test_fs'],
//   'test-fs-local-key-2',
//   true
// )

// saveCache(
//   ['/Users/prajjwal/Repos/warpbuild/playground/test_fs'],
//   'test-fs-local-key',
//   true,
//   true
// )

restoreCache(
  ['/Users/prajjwal/Repos/warpbuild/playground/test_fs'],
  'test-fs-local-key',
  ['test-fs'],
  {},
  true
)

// deleteCache(
//   ['/Users/prajjwal/Repos/warpbuild/playground/test_fs'],
//   'test-fs-local-key',
//   true,
//   false
// )
