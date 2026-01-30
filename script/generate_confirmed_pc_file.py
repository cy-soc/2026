"""
Purpose: Generate a JSONL file for the CySoc website.

Input: CSV file with columns named "response", "name", "field", "affiliation", "website".
    - This should be the output of the Shared Google Sheets document.

Output: Write a JSONL file containing the confirmed individuals' data.

Author: Matthew DeVerna
"""

import argparse
import pandas as pd
import json
import os


def main():
    parser = argparse.ArgumentParser(
        description="Create JSONL of confirmed individuals from CSV"
    )
    parser.add_argument("filepath", help="Path to the CSV file containing PC data")
    parser.add_argument(
        "-o",
        "--output",
        help="Output JSONL file path (default: same as input with .jsonl extension)",
    )
    args = parser.parse_args()

    df = pd.read_csv(args.filepath)
    pd.set_option("future.no_silent_downcasting", True)
    # Filter rows where folks have accepted the invitation (column is boolean)
    df["accepted_on_easychair"] = df["accepted_on_easychair"].fillna(False).astype(bool)
    confirmed_df = df[df["accepted_on_easychair"]].copy()
    # Sort by first name alphabetically (ignoring case)
    confirmed_df = confirmed_df.sort_values(
        by="name",
        key=lambda col: col.fillna("").apply(
            lambda x: x.split()[0].lower() if x.strip() else ""
        ),
    )

    # Determine output file path
    output_path = (
        args.output
        if args.output
        else f"{os.path.splitext(args.filepath)[0]}_confirmed" + ".jsonl"
    )

    with open(output_path, "w", encoding="utf-8") as outfile:
        for _, row in confirmed_df.iterrows():
            # Build JSON object with required keys; set missing values (NaN or empty string) to None
            name_val = (
                row["name"] if pd.notna(row["name"]) and row["name"] != "" else None
            )
            field_val = (
                row["field"] if pd.notna(row["field"]) and row["field"] != "" else None
            )
            affiliation_val = (
                row["affiliation"]
                if pd.notna(row["affiliation"]) and row["affiliation"] != ""
                else None
            )
            website_val = (
                row["website"]
                if pd.notna(row["website"]) and row["website"] != ""
                else None
            )

            person = {
                "name": name_val,
                "field": field_val,
                "affiliation": affiliation_val,
                "website": website_val,
            }
            # Write each JSON object as a new line
            outfile.write(json.dumps(person) + "\n")
    print(f"JSONL file created at: {output_path}")


if __name__ == "__main__":
    main()
