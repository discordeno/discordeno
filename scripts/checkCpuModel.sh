#!/bin/bash
 
hostCpu=$(lscpu | sed -nr '/Model name/ s/.*:\s*(.*) @ .*/\1/p')
targetCpu=$(curl https://raw.githubusercontent.com/discordeno/discordeno/benchies/cpu)

echo "host: ${hostCpu} target: ${targetCpu}"
if [ "$hostCpu" == "$targetCpu" ]; then
    exit 1
else
    exit 0
fi