#!/usr/bin/env bash
set -euo pipefail

source_dir=content
target_dir=content-indesign

rm -rf "$target_dir"
mkdir "$target_dir"

printf "DO NOT EDIT THE CONTENTS OF THIS FOLDER!\n" >> "$target_dir/README.md"
echo "It was generated automatically from the Markdown files in the '$source_dir' folder." >> "$target_dir/README.md"

find "$source_dir" -type f -name "*.md" -printf "%P\n" | while read -r file; do
  outdir="$target_dir/$(basename "$file" .md)"
  outfile=$(dirname "$file" | sed 's/\//_/g').icml
  mkdir -p "$outdir"
  echo ./pandoc "$source_dir/$file" -s -o "$outdir/$outfile"
  ./pandoc "$source_dir/$file" -s -o "$outdir/$outfile"
done
