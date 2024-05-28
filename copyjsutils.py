#!/usr/bin/env python3

import os
import shutil

def copy_js_files(src_dir, dest_dir):
    # Check if the destination directory exists, if not, create it
    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)

    # Recursively walk through the source directory
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith('.js'):  # Check if the file is a .js file
                file_path = os.path.join(root, file)
                with open(file_path, 'r') as f:
                    first_line = f.readline().strip()  # Read the first line and trim whitespace
                if first_line == "// !! copy-to-frontend":  # Check if the first line is as required
                    shutil.copy(file_path, os.path.join(dest_dir, file))  # Copy file to destination directory

def main():
    src_directory = "backend/utils"
    dest_directory = "static/js/utils"
    copy_js_files(src_directory, dest_directory)

    dest_dir_2 = "backend/functions/utils"

    if os.path.exists(dest_dir_2):
        shutil.rmtree(dest_dir_2)

    shutil.copytree(src_directory, dest_dir_2)

if __name__ == "__main__":
    main()