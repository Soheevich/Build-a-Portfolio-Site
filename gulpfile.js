const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const webp = require("gulp-webp");
const concat = require("gulp-concat");
const responsive = require("gulp-responsive");

gulp.task("compress", () =>
  gulp
    .src("src/js/*.js*")
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
);

gulp.task("scripts", () =>
  gulp
    .src("src/js/*.js*")
    .pipe(concat("all.js"))
    .pipe(gulp.dest("dist/js"))
);

gulp.task("imagemin", () =>
  gulp
    .src("src/images/*.{jpg,png}")
    .pipe(imagemin([imageminWebp()]))
    .pipe(gulp.dest("dist/images"))
);

gulp.task("webp", () =>
  gulp
    .src("src/images/*.{jpg,png}")
    .pipe(webp())
    .pipe(gulp.dest("dist/images"))
);

gulp.task("images", function() {
  return gulp
    .src("src/images/*.{jpg,png}")
    .pipe(
      $.responsive(
        {
          "*.jpg": [
            {
              width: 300,
              rename: { suffix: "-300px", extname: ".jpg" },
            },
            { 
              width: 600, 
              rename: { suffix: "-600px", extname: ".jpg" } },
            {
              width: 1900,
              rename: { suffix: "-1900px", extname: ".jpg" }, 
              // format option can be omitted because // Do not enlarge the output image if the input image are already less than the required dimensions.
              // format of output image is detected from new filename
              // format: 'jpeg'
              withoutEnlargement: true
            },
            {
              // Convert images to the webp format
              width: 630,
              rename: { suffix: "-630px", extname: ".webp" }
            }
          ]
        },
        {
          // Global configuration for all images
          // The output quality for JPEG, WebP and TIFF output formats
          quality: 80,
          progressive: true,
          withMetadata: false,
          errorOnEnlargement: false
        }
      )
    ) // Use progressive (interlace) scan for JPEG and PNG output // Strip all metadata // Do not emit the error when image is enlarged.
    .pipe(gulp.dest("dist/images"));
});
