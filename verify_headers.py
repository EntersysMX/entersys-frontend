#!/usr/bin/env python3
import subprocess
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

result = subprocess.run(
    ["gcloud.cmd", "compute", "ssh", "prod-server", "--zone", "us-central1-c",
     "--command", "docker exec entersys-frontend curl -I http://localhost 2>&1 | grep -E 'HTTP|Strict|Content-Security|Permissions|X-Frame|X-Content|Referrer'"],
    capture_output=True, text=True, timeout=30
)

print("=== Security Headers Verification (Direct nginx) ===\n")
print(result.stdout)
if result.stderr and "Warning" not in result.stderr:
    print("STDERR:", result.stderr)
