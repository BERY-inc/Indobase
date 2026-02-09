import os
import re

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as file:
        content = file.read()
    # Replace 'Supabase' with 'Indobase'
    content = re.sub(r'\bSupabase\b', 'Indobase', content)
    # Replace 'supabase' with 'indobase'
    content = re.sub(r'\bsupabase\b', 'indobase', content)
    with open(filepath, 'w', encoding='utf-8') as file:
        file.write(content)

def main():
    extensions = ['.md', '.mdx', '.tsx', '.jsx', '.html']
    for root, dirs, files in os.walk('.'):
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                filepath = os.path.join(root, file)
                replace_in_file(filepath)
                print(f"Processed {filepath}")

if __name__ == "__main__":
    main()
