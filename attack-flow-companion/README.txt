Attack Graph Lab — static prototype build

Serve these files from an HTTPS static host (or an HTTP localhost server).
Open index.html through that server. Do not use file://: browser modules and
Workers require an HTTP(S) origin. No application backend, Node/Python runtime,
account, package installation, or external CDN is needed by students.

Attack Graph Lab 0.5.0. The built-in Portal example is ready to explore; more
examples, including those from the M1a readings, are under "Explore an example".
Use Setup, Execute and Analyse; switch between the dependency graph and the state
graph above the drawing. Save project downloads a durable JSON copy that also
records the analysis rules; browser memory is not a backup.

The core is a positive, successful-case teaching model with deterministic effort.
Path counting, mean effort to failure and a probability tab are optional, each
with its own stated rules, under the Advanced menu. The tool does not execute
attacks.

Developer instructions, execution profile and verification record are in the
source repository under tools/attack-flow-companion/.
