#!/bin/bash

dn="$(dirname "$(realpath "${BASH_SOURCE[0]}")")"

cd "$dn"

mousebox_project="$(realpath "$dn/../mousebox")"
svg_designer_project="$(realpath "$dn/../svg-designer")"


function safe_rp {
    target="$1"
    target_dn="$(dirname "$target")"
    dnrp="$(realpath "$target_dn")"
    target_bn="$(basename "$target")"
    echo "$dnrp/$target_bn"
}

# Function to create symbolic links with fully qualified paths
# Relative paths in symlinks are wonky especially with dir symlinks
# and I never recommend them
function resolve_and_link {
    target="$1"
    name="$2"

    target_rp="$(safe_rp "$target")"
    name_rp="$(safe_rp "$name")"

    rm -rf "$name_rp"

    ln -s "$target_rp" "$name_rp"
}



# Repeat the process for @chakra-ui, since it tends to contain its own copy or react,#
# adn linking th entiree thing, even if not necessary, makes things easier
function should_link_package {
    project_name="$1"
    package_name="$2"
    if [ -d "./node_modules/$project_name/node_modules/$package_name" ]; then
        return 0
    else
        return 1
    fi
}

# Injects a pack from this project into the internal node_modules of another project that was previously included
# in this project's own node modules
# For example
# Suppose "this project" is called "knowcheck"
# Suppose the "referenced" project is called "mousebox"
# Suppose we have already copied mousebox into ./node_modules
# Then this function can be used to replace the "react" inside ./node_modules/mousebox/node_modules
# with ./node_moduless/react
function inject_package(){
    project_name=$(basename "$1")
    package_name="$2"
    rm -rf "./node_modules/$project_name/node_modules/$package_name"
    mkdir -p "./node_modules/$project_name/node_modules"
    resolve_and_link "$dn/node_modules/$package_name" "./node_modules/$project_name/node_modules/$package_name"
}

# First copies the files from another project into ./node_modules, and then performs appropriate package injection
# We copy instead of linking the files (symlink) to avoid corrupting the referenced project when injecting a package
function link_project(){
    project_name=$(basename "$1")

    echo "Copying files for $project_name..."

    rm -rf "./node_modules/$project_name"
    cp -r "$1" "./node_modules/$project_name"

    if should_link_package "$project_name" "react"; then
        echo "Injecting package react into $project_name..."
        inject_package "$1" "react"
    fi

    if should_link_package "$project_name" "@chakra-ui"; then
        echo "Injecting package @chakra-ui into $project_name..."
        inject_package "$1" "react"
    fi

}

cd frontend
echo "Linking projects to frontend..."
link_project "$mousebox_project"
link_project "$svg_designer_project"
cd ..

cd backend
echo "Linking projects to frontend..."

link_project "$mousebox_project"
link_project "$svg_designer_project"
cd ..
