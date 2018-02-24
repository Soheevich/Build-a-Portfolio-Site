const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
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

gulp.task("images", function() {
  return gulp
    .src("src/images/*.{jpg,png}")
    .pipe(
      responsive(
        {
          "*.{jpg,png}": [
            { width: 200, rename: { suffix: "-200px" } },
            { width: 400, rename: { suffix: "-400px" } },
            {
              width: 800,
              rename: { suffix: "-800px" }, // format: 'jpeg' // format of output image is detected from new filename // format option can be omitted because // Do not enlarge the output image if the input image are already less than the required dimensions.
              withoutEnlargement: true
            },
            {
              width: 1200,
              rename: { suffix: "-1200px" },
              withoutEnlargement: true
            },
            {
              width: 1600,
              rename: { suffix: "-1600px" },
              withoutEnlargement: true
            },
            { width: 200, rename: { suffix: "-200px", extname: ".webp" } },
            { width: 400, rename: { suffix: "-400px", extname: ".webp" } },
            {
              width: 800,
              rename: { suffix: "-800px", extname: ".webp" }, // format: 'jpeg' // format of output image is detected from new filename // format option can be omitted because // Do not enlarge the output image if the input image are already less than the required dimensions.
              withoutEnlargement: true
            },
            {
              width: 1200,
              rename: { suffix: "-1200px", extname: ".webp" },
              withoutEnlargement: true
            },
            {
              width: 1600,
              rename: { suffix: "-1600px", extname: ".webp" },
              withoutEnlargement: true
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
