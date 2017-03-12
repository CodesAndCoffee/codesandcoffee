var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var bowerFiles = require('main-bower-files');
var browserSync = require('browser-sync').create();
var es = require('event-stream');
var del = require('del');
var Q = require('q');
var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync('./package.json'));

// == PATH STRINGS ========
var paths = {
    scripts: './app/**/*.js',
    styles: ['./app/**/*.css', './app/**/*.scss'],
    images: './app/images/**/*',
    index: './app/index.html',
    partials: ['app/**/*.partial.html', '!app/index.html'],
    app: "./app/**",
    distDev: './app.dev',
    distProd: './app.prod',
    fonts: [
        './bower_components/font-awesome/fonts/**'
    ]
};

var vendorScriptsOrder = ['jquery.js', 'angular.js'];

//TASKS
gulp.task('default',['build-app-prod']);

gulp.task('clean',['clean-prod','clean-dev']);
gulp.task('clean-prod', cleanProd);
gulp.task('clean-dev', cleanDev);

gulp.task('build-app-scripts-dev', buildAppScriptsDev);
gulp.task('build-app-scripts-prod', buildAppScriptsProd);

gulp.task('build-script-partials-dev', buildScriptPartialsDev);
gulp.task('build-script-partials-prod', buildScriptPartialsProd);

gulp.task('build-vendor-scripts-dev', ['build-script-partials-dev'], buildVendorScriptsDev);
gulp.task('build-vendor-scripts-prod', ['build-script-partials-prod'], buildVendorScriptsProd);

gulp.task('build-vendor-fonts-dev', buildVendorFontsDev);
gulp.task('build-vendor-fonts-prod', buildVendorFontsProd);

gulp.task('build-app-dev', ['build-vendor-fonts-dev', 'build-vendor-scripts-dev'], buildAppDev);
gulp.task('build-app-prod', ['build-vendor-fonts-prod', 'build-vendor-scripts-prod'], buildAppProd);

gulp.task('watch-dev', ['build-app-dev'], watchDev);
gulp.task('serve-prod', serveProd);

gulp.task('build-styles-dev', buildStylesDev);
gulp.task('watch-styles-dev', ['build-styles-dev'], function() {
    browserSync.stream();
});

gulp.task('build-htmls-dev', buildIndexDev);
gulp.task('watch-htmls-dev', ['build-htmls-dev'], function() {
    browserSync.reload();
});

gulp.task('watch-app-scripts-dev', ['build-app-scripts-dev'], function() {
    browserSync.reload();
});

function validateHtml() {
    return gulp.src(paths.index)
        .pipe(plugins.htmlhint())
        .pipe(plugins.htmlhint.reporter());
}

function validateScripts() {
    return gulp.src(paths.scripts)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter());
}

function validateAppScripts() {
    return gulp.src(paths.scripts)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
}

function validatePartials() {
    return gulp.src(paths.partials)
        .pipe(plugins.htmlhint({
            'doctype-first': false
        }))
        .pipe(plugins.htmlhint.reporter());
}

function scriptPartials() {
    return validatePartials()
        .pipe(plugins.htmlhint.failReporter())
        .pipe(plugins.htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(plugins.ngHtml2js({
            moduleName: 'templatesCache'
        }));
}

function cleanDev() {
    return del(paths.distDev);
}

function cleanProd() {
    return del(paths.distProd);
}

function buildVendorScriptsDev() {
    return gulp.src(bowerFiles('**/*.js'))
        .pipe(plugins.order(vendorScriptsOrder))
        .pipe(gulp.dest(paths.distDev + '/vendor_scripts'));
}

function buildVendorScriptsProd() {
    return gulp.src(bowerFiles('**/*.js'))
        .pipe(plugins.order(vendorScriptsOrder))
        .pipe(plugins.concat('vendor.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.distProd + '/scripts'));
}

function buildVendorStylesDev() {
    return gulp.src(bowerFiles('**/*.css'))
        .pipe(gulp.dest(paths.distDev + '/vendor_styles'));
}

function buildVendorStylesProd() {
    return gulp.src(bowerFiles('**/*.css'))
        .pipe(plugins.order(vendorScriptsOrder))
        .pipe(gulp.dest(paths.distProd + '/styles'));
}

function buildVendorFontsDev() {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.distDev + '/fonts'));
}

function buildVendorFontsProd() {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.distProd + '/fonts'));
}

function buildImagesDev() {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.distDev + '/images', {
            overwrite: true
        }));
}

function buildImagesProd() {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.distProd + '/images', {
            overwrite: true
        }));
}

function buildScriptPartialsDev() {
    return scriptPartials()
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(paths.distDev + '/app_scripts'));
}

function buildScriptPartialsProd() {
    return scriptPartials();
}

function buildAppScriptsDev() {
    return validateAppScripts()
        .pipe(plugins.angularFilesort())
        .pipe(plugins.ngAnnotate())
        .pipe(gulp.dest(paths.distDev + '/app_scripts'));
}

function buildAppScriptsProd() {
    return es.merge(validateAppScripts(), scriptPartials())
        .pipe(plugins.angularFilesort())
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.stripDebug())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat("app.min.js"))
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(paths.distProd + '/scripts'));
}

function buildStylesDev() {
    return gulp.src(paths.styles)
        .pipe(plugins.sass())
        .pipe(gulp.dest(paths.distDev));
}

function buildStylesProd() {
    return gulp.src(paths.styles)
        .pipe(plugins.sass())
        .pipe(gulp.dest(paths.distProd));
}

function buildIndexDev() {
    var vendorScripts = buildVendorScriptsDev();
    var appScripts = es.merge(buildScriptPartialsDev(), buildAppScriptsDev());
    var appStyles = es.merge(buildVendorStylesDev(), buildStylesDev());

    return validateHtml()
        .pipe(gulp.dest(paths.distDev))
        .pipe(plugins.inject(vendorScripts, {
            relative: true,
            name: 'bower'
        }))
        .pipe(plugins.inject(appScripts, {
            relative: true
        }))
        .pipe(plugins.inject(appStyles, {
            relative: true
        }))
        .pipe(gulp.dest(paths.distDev));
}

function buildIndexProd() {
    var vendorScripts = buildVendorScriptsProd();
    var appScripts = buildAppScriptsProd();
    var appStyles = es.merge(buildVendorStylesProd(), buildStylesProd());

    return validateHtml()
        .pipe(gulp.dest(paths.distProd))
        .pipe(plugins.inject(vendorScripts, {
            relative: true,
            name: 'bower'
        }))
        .pipe(plugins.inject(appScripts, {
            relative: true
        }))
        .pipe(plugins.inject(appStyles, {
            relative: true
        }))
        .pipe(gulp.dest(paths.distProd));
}

function buildPartialsDev() {
    return validatePartials()
        .pipe(gulp.dest(paths.distDev));
}

function buildPartialsProd() {
    return validatePartials()
        .pipe(gulp.dest(paths.distProd));
}

function buildAppDev() {
    return es.merge(buildIndexDev(), buildImagesDev());
}

function buildAppProd() {
    return es.merge(buildIndexProd(), buildImagesProd());
}

function watchDev() {
    browserSync.init({
        server: {
            baseDir: paths.distDev
        }
    });


    gulp.watch(paths.styles, function() {
        return buildStylesDev()
            .pipe(browserSync.stream());
    });
    gulp.watch([paths.index, paths.partials], ['watch-htmls-dev']);
    gulp.watch(paths.scripts, ['watch-app-scripts-dev']);
}

function serveProd() {
    browserSync.init({
        server: {
            baseDir: paths.distProd
        }
    });
}

//author: Donraedel P. Sumayan3
