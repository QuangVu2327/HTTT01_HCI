import csv
import sys
import os

def process_survey(csv_file):
    if not os.path.exists(csv_file):
        print(f"File not found: {csv_file}")
        return

    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        data = list(reader)

    # Basic summarization logic (placeholder)
    print(f"Processed {len(data)} responses from {csv_file}.")
    # TODO: Add logic to count frequencies, calculate means, etc.
    # Output to survey_answers.md
    with open('data/raw/survey_answers.md', 'w', encoding='utf-8') as f:
        f.write("# Tổng hợp kết quả khảo sát\n\n")
        f.write(f"Tổng số phiếu: {len(data)}\n")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python survey_processor.py <csv_file>")
    else:
        process_survey(sys.argv[1])
