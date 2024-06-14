import os
import subprocess


def discover_ts_files(directory):
    ts_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".ts"):
                ts_files.append(os.path.join(root, file))
    return ts_files


def run_ts_file(ts_file):
    try:
        print(f"Running {ts_file}...")
        result = subprocess.check_output(
            ["yarn", "run", "tsx", ts_file], stderr=subprocess.STDOUT
        )
        print(result.decode())
        print("done")
    except subprocess.CalledProcessError as e:
        print(f"Error running {ts_file}: {e.output.decode()}")


def main():
    directory = "./scripts/code-generation"
    ts_files = discover_ts_files(directory)

    for ts_file in ts_files:
        run_ts_file(ts_file)


if __name__ == "__main__":
    main()


if __name__ == "__main__":
    main()
