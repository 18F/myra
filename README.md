# U.S. Department of the Treasury myRA Program

## What

Individual and employer landing pages for the U.S. Department of the Treasury’s new retirement savings program, myRA (“My Retirement Account”).

We plan to use this repository as a place to share our work and direction, but please do not consider anything you see here to be final or production-ready. This is still very much in beta.

## Why

This effort is in support of Treasury's new myRA program, which is currently being developed to provide a simple, safe, and affordable way for individuals to start saving.

## How it works

The myRA landing pages are static HTML/CSS/JS pages. We maintain the pages in simple Markdown files, which are compiled into HTML by Jekyll. We also use Sass as a preprocessor for the CSS.

## Getting started

Ruby gems:

* `gem install jekyll`

This site is deployed using **Jekyll 2.4**.

Sass libraries:

* `gem install sass`
* `gem install bourbon`
* `gem install neat`
* `gem install bitters`

If you are not familiar with how to work with either Bourbon, Neat, or Bitters, visit their website at [bourbon.io](http://bourbon.io/).

To keep our code updating continuously as we edit, we use `jekyll serve --baseurl '' --watch`.

## Contributing

Content and feature suggestions are welcome via GitHub Issues. Code contributions are welcome via pull request, although of course we cannot guarantee your changes will be included.

## Deploying the site

To deploy the site to **production**, at `https://myra.treasury.gov`, you will need:

* Access to the 18F Amazon Web Services account.
* Permissions to upload to a particular S3 bucket, `myra-cloudfront`.
* A command line client to perform the upload, such as `s3cmd` or the official `aws` tool. Instructions below show `s3cmd`. Install s3cmd on Mac with `brew install s3cmd`, and Ubuntu with `apt-get install s3cmd`.

To deploy:

* From the project root, build the site **using the production configuration**:

```bash
jekyll build --config _config.yml,_config-production.yml
```

* If it built without errors, upload the website to the S3 bucket. The below command uses `s3cmd` to upload all files in `_site`, make them public, and tells both browsers and CloudFront to cache files for an hour.

```bash
s3cmd  put --recursive --add-header="Cache-Control:max-age=86400" -P _site/* s3://myra-cloudfront/
```

You can see the results of your work immediately at `http://myra-cloudfront.s3-website-us-east-1.amazonaws.com`.

The live site, `https://myra.treasury.gov`, **will take up to an hour** to update.

Bear in mind that the delay time to update the live site depends on the **previous** deploy's specified cache time, not the one you just did. Assuming you always use the same cache time, it will always update within an hour.

If you **need an immediate update**, you will have to "invalidate" the CloudFront distribution, using either the web console or a third party tool. (Neither the `aws` nor `s3cmd` tools properly support this yet.)

### Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.
