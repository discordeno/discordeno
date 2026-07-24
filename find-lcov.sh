find packages/ -name "lcov.info" -type f | awk -F'/' '{ print $2 }' | while read -r package; do
  sed -i "s|SF:src|SF:packages/${package}/src|g" "packages/$package/coverage/lcov.info"

  ./codecov --verbose upload-process --disable-search --token ${{ secrets.CODECOV_TOKEN }} \
    --fail-on-error --git-service github --sha $(git rev-parse HEAD) \
    --file packages/$package/coverage/lcov.info --flag $package-unit --flag $package
done
